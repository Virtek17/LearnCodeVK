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
};
