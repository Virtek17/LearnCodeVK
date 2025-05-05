import { useState, useEffect } from "react";
import { testsApi } from "../service/testsApi";

// Получаем направление
export const useTest = (topic) => {
  const [tests, setTests] = useState([]);
  const [countTests, setCountTests] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await testsApi.getTest(topic);

        const count = data.length;
        setCountTests(count);

        setTests(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (topic) {
      load();
    }
  }, [topic]);

  return { tests, isLoading, error, countTests };
};
