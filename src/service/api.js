import supabase from "./supabase";

export const TheoryApi = {
  // Получение языков
  getTheoryLanguages: async () => {
    const { data, error } = await supabase
      .from("theory_lang")
      .select("name, description, img");

    if (error) throw new Error(error.message);
    return data;
  },

  // получение темы
  getTheme: async (lang) => {
    const { data, error } = await supabase
      .from("theory_lang")
      .select(
        `
        name,
        theory_theme (
          title,
          icon_name,
          theory_topic (
            title,
            tag,
            end
          )
        )
      `
      )
      .eq("name", lang); // Фильтр по имени языка

    if (error) throw new Error(error.message);

    const result = data[0];

    return result;
  },
};
