// hooks/useRating.js

import { useEffect, useState } from "react";
import { userApi } from "../service/userApi";
import { useUser } from "./useUser";

export const useRating = () => {
  const [ratingData, setRatingData] = useState({
    top5: [],
    currentUser: null,
    isUserInTop5: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchRating = async () => {
      if (!user?.id) return;

      try {
        const data = await userApi.getUserRating(user.id);
        setRatingData(data);
      } catch (error) {
        console.error("Ошибка при получении рейтинга:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRating();
  }, [user]);

  return { ratingData, isLoading };
};