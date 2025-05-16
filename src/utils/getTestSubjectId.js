import supabase from "../service/supabase";

export const getTestSubjectId = async (topic) => {
  const { data, error } = await supabase
    .from("test_subject")
    .select("id")
    .eq("text", topic)
    .single();

  if (error) {
    console.error("Ошибка получения test_subject.id:", error.message);
    return null;
  }

  return data?.id || null;
};
