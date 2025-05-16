import supabase from "./supabase";

export const testsApi = {
  getDirection: async () => {
    const { data, error } = await supabase.from("test_directions").select("*");

    if (error) throw new Error(error.message);
    return data || null;
  },

  getTestLang: async (direction) => {
    const { data, error } = await supabase
      .from("test_directions")
      .select(
        `
        direction,
        test_lang (
          lang, 
          block
        )
      `
      )
      .eq("direction", direction);

    if (error) throw new Error(error.message);

    // Реверсируем порядок языков внутри каждого направления
    const reversedData =
      data?.map((item) => ({
        ...item,
        test_lang: [...item.test_lang].reverse(),
      })) || null;

    return reversedData;
  },

  getTestSubject: async (subject) => {
    const { data, error } = await supabase
      .from("test_lang")
      .select(
        `
        lang,
        test_subject (
          text,
          block,
          order
        )
      `
      )
      .eq("lang", subject)
      .order("order", { foreignTable: "test_subject", ascending: true }); // Сортировка по order в

    if (error) throw new Error(error.message);
    console.log("API Data: ", data);
    return data || null;
  },

  getTest: async (topic) => {
    const { data, error } = await supabase
      .from("test_subject")
      .select(
        ` 
        text,
        test(
          answer, 
          question, 
          variant
        )
        `
      )
      .eq("text", topic);

    const transformedData = data.map((subject) => ({
      ...subject,
      test: subject.test.map((testItem) => ({
        ...testItem,
        variant: testItem.variant.split(",").map((v) => v.trim()),
      })),
    }));
    if (error) throw new Error(error.message);
    return transformedData[0].test || null;
  },

  getUserProgress: async (userId) => {
    const { data, error } = await supabase
      .from("test_subject")
      .select(
        `
    text,
    user_test_progress (
      id,
      user_id,
      is_passed
    )
  `
      )
      .match({ "user_test_progress.user_id": userId })
      .order("id", { ascending: true });
    if (error) throw new Error(error.message);
    return data;
  },
};
