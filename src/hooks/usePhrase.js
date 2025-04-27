import { useCallback, useEffect, useState } from "react";
import { TheoryApi } from "../service/api";

export const usePhrase = () => {
  const [phrase, setPhrase] = useState(null); // Фразу начинаем как null
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      const data = await TheoryApi.getPhrase();

      if (data && data.length > 0) {
        // Проверяем, была ли уже сохранена фраза в sessionStorage
        const phraseInSession = sessionStorage.getItem("phraseShown");

        if (!phraseInSession) {
          // Если фраза ещё не была сохранена, выбираем случайную и сохраняем её текст
          const randomIndex = Math.floor(Math.random() * data.length);
          const randomPhrase = data[randomIndex];
          const randomPhraseText = randomPhrase.text; // Предполагаем, что поле "text" есть

          // Сохраняем только текст фразы в sessionStorage
          sessionStorage.setItem("phraseShown", randomPhraseText);

          // Устанавливаем фразу в state
          setPhrase(randomPhraseText); // Устанавливаем текст фразы
        } else {
          // Если фраза уже была сохранена, просто используем её из sessionStorage
          setPhrase(phraseInSession);
        }
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { phrase, isLoading, error };
};
