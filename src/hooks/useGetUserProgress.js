import { useState, useEffect } from "react";
import { testsApi } from "../service/testsApi";

// Получаем направление
export const useGetUserProgress = (userId) => {
  const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await testsApi.getUserProgress(userId);
        setTests(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      load();
    }
  }, [userId]);

  return { tests, isLoading, error };
};
