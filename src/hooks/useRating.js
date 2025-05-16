import { useEffect, useState } from "react";
import { userApi } from "../service/userApi";

export const useRating = () => {
  const [ratingList, setRatingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        setIsLoading(true);
        const data = await userApi.getUserRating();

        if (data) {
          setRatingList(data);
        } else {
          setRatingList([]);
        }
      } catch (err) {
        console.error("Ошибка при загрузке рейтинга:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRating();
  }, []);

  return { ratingList, isLoading, error };
};
