import { useEffect, useState } from "react";
import bridge from "@vkontakte/vk-bridge";

export const useGetUserId = () => {
  const [userId, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);

        const vkData = await bridge.send("VKWebAppGetUserInfo", {});
        const vkUserId = vkData?.id;
        setUser(vkUserId);
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
