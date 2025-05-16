import { useState, useEffect } from "react";
import { testsApi } from "../service/testsApi";

// Получаем тесы по теме
export const useTestSubject = (subject) => {
  const [testSubject, setTestSubject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await testsApi.getTestSubject(subject);

        if (data && data.length > 0) {
          setTestSubject(data[0]); // только если данные есть
        } else {
          setTestSubject({ test_subject: [] }); // fallback на пустую структуру
        }
      } catch (err) {
        setError(err.message);
        setTestSubject({ test_subject: [] }); // fallback при ошибке
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [subject]);

  return { testSubject, isLoading, error };
};
