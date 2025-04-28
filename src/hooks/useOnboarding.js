import { useEffect, useState } from "react";

export const useOnboarding = () => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    // Проверяем, завершён ли онбординг
    const onboardCompleted = localStorage.getItem("onboardCompleted");

    // Если онбординг не был завершён, показываем онбординг
    if (!onboardCompleted) {
      setIsShow(true);
    }
  }, []);

  const completeOnboarding = () => {
    console.log("ВЫЗОВ ФУНКЦИИ");
    // Сохраняем, что онбординг завершён
    localStorage.setItem("onboardCompleted", "true");
    setIsShow(false); // Закрываем онбординг
  };

  return { isShow, completeOnboarding };
};
