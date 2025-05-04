import { useState, useEffect } from "react";
import { testsApi } from "../service/testsApi";

// Получаем направление
export const useTestDirection = () => {
  const [testDirection, setTestDirection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await testsApi.getDirection();
        setTestDirection(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return { testDirection, isLoading, error };
};
