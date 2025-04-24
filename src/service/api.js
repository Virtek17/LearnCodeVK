import supabase from "./supabase";

export const TheoryApi = {
  // Получение языков
  fetchLanguages: async () => {
    const { data, error } = await supabase
      .from("lang_theory")
      .select("name, description, img");

    if (error) throw new Error(error.message);
    return data;
  },

  // получение темы
  fetchTopics: async (lang) => {
    const { data, error } = await supabase.from("Theory_articles").select(`
            title,
            tag,
            end,
            TheorySection (
              title,
              icon_name,
              lang_theory (
                name
              )
            )
          `);

    if (error) throw new Error(error.message);
    return data;
  },
};
