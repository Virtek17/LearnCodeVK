import { useEffect, useState } from "react";
import bridge from "@vkontakte/vk-bridge";
import { userApi } from "../service/userApi";

export const useUserId = () => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);

        const vkData = await bridge.send("VKWebAppGetUserInfo", {});
        const userId = vkData.id;
        setUserId(userId);
        
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { userId, isLoading, error };
};
