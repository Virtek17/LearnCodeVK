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

  getUserRating: async () => {
    const { data, error } = await supabase
      .from("user")
      .select("name, photo, points")
      .order("points", { ascending: false }) // false = от большего к меньшему
      .limit(5);

    if (error) {
      console.log(error.message);
      return null;
    }

    return data;
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
