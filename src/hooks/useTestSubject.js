import { useState, useEffect } from "react";
import { testsApi } from "../service/testsApi";

// Получаем тесы по теме
export const useTestSubject = (subject) => {
  const [testSubject, setTestSubject] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await testsApi.getTestSubject(subject);
        setTestSubject(data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [subject]);

  return { testSubject, isLoading, error };
};
