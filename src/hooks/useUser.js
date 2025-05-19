import { useEffect, useState } from "react";
import bridge from "@vkontakte/vk-bridge";
import { userApi } from "../service/userApi";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const DEFAULT_VK_PHOTO = "https://sun13-2.userapi.com/impf/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&sign=10ad7d7953daabb7b0e707fdfb7ebefd&u=I6EtahnrCRLlyd0MhT2raQt6ydhuyxX4s72EHGuUSoM&cs=200x200";

  const DEFAULT_MY_PHOTO = "https://sun9-32.userapi.com/impg/XrAYD9jOCqlsbum2hDbBsJNdLaPfybBddaxo2Q/7fAFnNoEEMQ.jpg?size=640x425&quality=95&sign=cf27b64532df933e911008b4328b4b93&type=album";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);

        // 1. Получаем данные из ВК
        const vkData = await bridge.send("VKWebAppGetUserInfo", {});

        if (!vkData || !vkData.id) {
          throw new Error("Не удалось получить ID пользователя из ВК");
        }

        // 2. Проверяем, есть ли пользователь в БД
        let dbUser = await userApi.getUser(vkData.id);

        if (!dbUser) {
          // 3. Если нет — создаём нового
          const userData = {
            id: vkData.id,
            name: vkData.first_name ?? "Анонимный кабан",
            photo: vkData.photo_200 === DEFAULT_VK_PHOTO ? DEFAULT_MY_PHOTO : vkData.photo_200 ?? "",
          };

          dbUser = await userApi.createUser(userData);

          // 4. Инициализируем прогресс для нового пользователя
          await userApi.initializeProgressForUser(dbUser.id);
        }

        setUser(dbUser);
      } catch (err) {
        console.error("Ошибка в useUser:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoading, error };
};