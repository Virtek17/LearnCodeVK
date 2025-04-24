import { useState, useEffect, useCallback } from "react";
import { TheoryApi } from "../service/api";

export const useTopics = (langName) => {
  const [topics, setTopics] = useState([]);
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
    const load = async () => {
      try {
        const data = await TheoryApi.fetchTopics(langName);
        setTopics(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (langName) load(); // Загружаем только если передан langName
  }, [langName]);

  // Возвращаем всё, что нужно компоненту
  return { topics, isLoading, error };
};
