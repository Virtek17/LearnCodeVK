import { useEffect, useState } from "react";
import bridge from "@vkontakte/vk-bridge";
import { userApi } from "../service/userApi";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);

        // 1. Поулчаем данные из VK
        const vkData = await bridge.send("VKWebAppGetUserInfo", {});

        // 2. Проверяем есть ли пользователь в бд
        let dbUser = await userApi.getUser(vkData.id);
        // console.log("dbUser первая проверка: ", dbUser);

        // 3. Если нет - создаем
        if (!dbUser) {
          // console.log("Пользователь еще не создан, идет создание...");
          dbUser = await userApi.createUser({
            id: vkData.id,
            name: vkData.first_name,
            photo: vkData.photo_200,
          });
          // console.log("dbUser после создания", dbUser);

          // 4. Инициализируем прогресс для нового пользователя
          await userApi.initializeProgressForUser(dbUser.id);
        }
        setUser(dbUser);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoading, error };
};
