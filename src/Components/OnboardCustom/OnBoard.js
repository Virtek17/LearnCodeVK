import PropTypes from "prop-types";
import style from "./OnBoard.module.css";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "@vkontakte/vkui";
import { Icon24Dismiss } from "@vkontakte/icons";
export const OnBoard = () => {
  const [activeBoard, setActiveBoard] = useState(0);
  const [showBoard, setShowBoard] = useState(true);
  const content = [
    {
      title: "Э, ботан!",
      text: "Тут весь кодерский движ в одном месте. Забыл чё-то? Без паники — я в тебя вложу, шо надо.",
    },
    {
      title: "Главная",
      text: "Здесь я буду поддерживать тебя своими фразочками.",
    },
    {
      title: "Тесты",
      text: "Тут проверяют, шаришь ты хоть за что-то или так, воздух сотрясаешь. Хочешь — проходи по одному, хочешь — сразу на итоговый залетай, мне пофиг. Главное — потом не ной, что ничего не понял.",
    },
    {
      title: "Карточки",
      text: "Это чтоб ты сам понял, кабан ты уже или пока ещё шкет. Без тупых вариантов ответа, без подстав. Зачилься, листай, вспоминай. Нервничать рано — косяки всё равно никто кроме тебя не увидит.",
    },
    {
      title: "Теория",
      text: "Читай, вбивай в башку, двигайся дальше. Удачи... хотя, если честно, тебе тут не удача нужна, а башка рабочая.",
    },
  ];

  return (
    <>
      {content.length > activeBoard && showBoard ? (
        <div className={style.wrapper}>
          <div className={style.content}>
            <div className={style.header}>
              <div className={style.counter}>
                {activeBoard + 1} / {content.length}
              </div>
              <div onClick={() => setShowBoard(false)} className={style.close}>
                <Icon24Dismiss />
              </div>
            </div>

            <div className={style.temp}>
              <div className={clsx(style.title)}>
                {content[activeBoard].title}
              </div>
              <div className={clsx(style.text)}>
                {content[activeBoard].text}
              </div>
              <div className={clsx(style.btnWrapper)}>
                <Button stretched onClick={() => setShowBoard(false)}>
                  <span>Пропустить</span>
                </Button>
                <Button
                  stretched
                  onClick={() => setActiveBoard(activeBoard + 1)}
                >
                  <span>Далее</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

OnBoard.propTypes = {
  id: PropTypes.string,
};
