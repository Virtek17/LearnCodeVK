import { useState, useEffect } from "react";
import { TheoryApi } from "../service/api";

export const useTheme = (langName) => {
  const [theme, setTheme] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Автоматическая загрузка при инициализации
  useEffect(() => {
    const load = async () => {
      try {
        const data = await TheoryApi.getTheme(langName);
        setTheme(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (langName) load(); // Загружаем только если передан langName
  }, [langName]);

  // Возвращаем всё, что нужно компоненту
  return { theme, isLoading, error };
};
