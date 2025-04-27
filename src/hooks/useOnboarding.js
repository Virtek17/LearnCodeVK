import { useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";

export const useOnboarding = () => {
  useEffect(() => {
    // Проверяем, были ли уже показаны слайды
    const slidesShown = localStorage.getItem("slidesShown");

    if (!slidesShown) {
      // Если слайды не показывались, показываем их
      bridge
        .send("VKWebAppShowSlidesSheet", {
          slides: [
            {
              media: {
                blob: "data:image/png;base64,[IMAGE_DATA]",
                type: "image",
              },
              title: "Э, ботан!",
              subtitle:
                "Тут весь кодерский движ в одном месте. Забыл чё-то? Без паники — я в тебя вложу, шо надо.",
            },
            {
              media: {
                blob: "data:image/png;base64,[IMAGE_DATA]",
                type: "image",
              },
              title: "Главная",
              subtitle: "Здесь я буду поддерживать тебя своими фразочками",
            },
            {
              media: {
                blob: "data:image/png;base64,[IMAGE_DATA]",
                type: "image",
              },
              title: "Тесты",
              subtitle:
                "Тут проверяют, шаришь ты хоть за что-то или так, воздух сотрясаешь. Хочешь — проходи по одному, хочешь — сразу на итоговый залетай, мне пофиг. Главное — потом не ной, что ничего не понял.",
            },
            {
              media: {
                blob: "data:image/png;base64,[IMAGE_DATA]",
                type: "image",
              },
              title: "Карточки",
              subtitle:
                "Это чтоб ты сам понял, кабан ты уже или пока ещё шкет. Без тупых вариантов ответа, без подстав. Зачилься, листай, вспоминай. Нервничать рано — косяки всё равно никто кроме тебя не увидит.",
            },
            {
              media: {
                blob: "data:image/png;base64,[IMAGE_DATA]",
                type: "image",
              },
              title: "Теория",
              subtitle:
                "Читай, вбивай в башку, двигайся дальше. Удачи... хотя, если честно, тебе тут не удача нужна, а башка рабочая.",
            },
          ],
        })
        .then((data) => {
          if (data.result) {
            // Слайды были показаны, теперь сохраняем флаг в localStorage
            localStorage.setItem("slidesShown", "true");
          }
        })
        .catch((error) => {
          // Ошибка
          console.log(error);
        });
    }
  }, []);
};
