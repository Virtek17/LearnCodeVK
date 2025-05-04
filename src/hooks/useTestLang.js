import { useState, useEffect } from "react";
import { testsApi } from "../service/testsApi";

// Получаем направление
export const useTestLang = (direction) => {
  const [testLang, setTestLang] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await testsApi.getTestLang(direction);
        setTestLang(data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (direction) {
      load();
    }
  }, [direction]);

  return { testLang, isLoading, error };
};
