import { useCallback } from "react";
import { userApi } from "../service/userApi";

export const useAddPoints = () => {
  const addPointsIfNotReceived = useCallback(async (userId, currentPoints, testSubjectId) => {
    try {
      // 1. Проверяем, получил ли пользователь награду за этот тест
      const hasReceived = await userApi.checkIfPointsReceived(userId, testSubjectId);

      if (hasReceived) {
        console.log("Очки за этот тест уже были начислены");
        return false;
      }

      // 2. Начисляем очки
      await userApi.addUserPoints(userId, currentPoints);

      // 3. Отмечаем, что награда получена
      await userApi.markPointsAsReceived(userId, testSubjectId);

      console.log("Очки успешно начислены и отмечены");
      return true;

    } catch (error) {
      console.error("Ошибка при начислении очков:", error.message);
      throw error;
    }
  }, []);

  return { addPointsIfNotReceived };
};