import { useCallback } from "react";
import { userApi } from "../service/userApi";

// Получаем тесы по теме
export const useUpdateProgress = () => {
  const updateProgress = useCallback(async (userId, testSubjectId) => {
    try {
      await userApi.updateSubjectProgress(userId, testSubjectId, true);
      return true;
    } catch (error) {
      console.error("Не удалось обновить прогресс: ", error.message);
      return false;
    }
  }, []);

  return { updateProgress };
};
