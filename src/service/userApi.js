import supabase from "./supabase";

export const userApi = {
  // Получение пользователя по VKID
  getUser: async (vkid) => {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", vkid)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(error.message);
    } // Игнорим ошибку "не найдено"
    return data || null;
  },

  getUserById: async (id) => {
    const { data, error } = await supabase
      .from("user")
      .select("id")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  createUser: async (userData) => {
    const { data, error } = await supabase
      .from("user")
      .insert([userData])
      .select()
      .single();
    console.log(error);
    if (error) throw new Error(error.message);
    return data;
  },

  getUserRating: async (currentUserId) => {
    // Получаем ТОП-5 пользователей по очкам
    const { data: top5, error: top5Error } = await supabase
    .from("user")
    .select("id, name, photo, points")
    .order("points", { ascending: false })
    .limit(5);

    if (top5Error) throw new Error(top5Error.message);

    // Получаем данные текущего пользователя
    const { data: currentUser, error: currentUserError } = await supabase
      .from("user")
      .select("id, name, photo, points")
      .eq("id", currentUserId)
      .single();

    if (currentUserError) throw new Error(currentUserError.message);

    // Проверяем, входит ли текущий пользователь в ТОП-5
    const isUserInTop5 = top5.some((user) => user.id === currentUser.id);

    // Считаем количество пользователей с бОльшим количеством очков
    const { count, error: countError } = await supabase
      .from("user")
      .select("*", { count: "exact", head: true })
      .gt("points", currentUser.points);

    if (countError) throw new Error(countError.message);

    const currentUserPosition = count + 1;

    return {
      top5,
      currentUser: {
        ...currentUser,
        position: currentUserPosition,
      },
      isUserInTop5,
    };
  },
  
  // начисление баллов юзеру
  addUserPoints: async (userId, userPoints) => {
    try {
      const { error } = await supabase
        .from("user")
        .update({ points: userPoints + 10 })
        .match({ id: userId });

      if (error) throw new Error(error.message);
      console.log(`Прогресс для юзера ${userId} обновлен`);
    } catch (error) {
      console.error("Ошибка при добавлениии баллов ", error.message);
      throw error;
    }
  },

  // проверка получил ля пользователь баллы
  checkIfPointsReceived: async (userId, testSubjectId) => {
    const {data, error} = await supabase 
      .from("user_test_progress")
      .select("has_received_points")
      .match({ user_id: userId, test_subject_id: testSubjectId })
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(error.message);
    }
  
    return data?.has_received_points || false
  },

  // пометка что награда получена
  markPointsAsReceived: async (userId, testSubjectId) => {
    const { error } = await supabase
      .from("user_test_progress")
      .update({ has_received_points: true })
      .match({ user_id: userId, test_subject_id: testSubjectId });
  
    if (error) throw new Error(error.message);
    console.log("Пользователь отмечен как получивший награду");
  },


  // Два метода не трогать
  initializeProgressForUser: async (userId) => {
    try {
      // Получаем все темы
      const { data: subject, error: subjectError } = await supabase
        .from("test_subject")
        .select("id, order_to_progress") // добавили order_for_progress для уверенности
        .order("order_to_progress", { ascending: true }); // сортируем по возрастанию

      if (subjectError) throw new Error(subjectError.message);

      // формируем массив записей для user_test_progress
      const progressData = subject.map((subject, index) => ({
        user_id: userId,
        test_subject_id: subject.id,
        is_passed: index === 0 ? true : false,
      }));

      // Добавляем записи в таблицу user_test_progress
      const { error: inserError } = await supabase
        .from("user_test_progress")
        .insert(progressData);

      if (inserError) throw new Error(inserError.message);
      console.log("Прогресс успешно инициализирован!");
    } catch (error) {
      console.log("Ошибка при инициализации прогресса: ", error.message);
      throw error;
    }
  },

  updateSubjectProgress: async (userId, testSubject, isPassed = true) => {
    try {
      const { error } = await supabase
        .from("user_test_progress")
        .update({ is_passed: isPassed })
        .match({ user_id: userId, test_subject_id: testSubject + 1 });

      if (error) throw new Error(error.message);
      console.log(`Прогресс для темы ${testSubject} обновлен`);
    } catch (error) {
      console.error("Ошибка при обновлении прогресса: ", error.message);
      throw error;
    }
  },
};
