import { useState, useEffect, useCallback } from "react";
import { TheoryApi } from "../service/api";

export const useTheory = () => {
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLanguages = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await TheoryApi.fetchLanguages();
      setLanguages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Автоматическая загрузка при инициализации
  useEffect(() => {
    loadLanguages();
  }, [loadLanguages]);

  // Возвращаем всё, что нужно компоненту
  return {
    languages,
    isLoading,
    error,
    reload: loadLanguages, // Для ручного обновления
  };
};
