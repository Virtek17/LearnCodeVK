import PropTypes from "prop-types";
import style from "./Card.module.css";
import kaban from "../../assets/Kabans/kaban-2.svg";
import { useAppearance } from "@vkontakte/vk-bridge-react";
import { Icon20ErrorCircle } from "@vkontakte/icons";
import clsx from "clsx";

export const Card = ({
  question,
  answer,
  card,
  currentQuestion,
  flipped,
  onClick,
}) => {
  const cardArray = card.cards;
  const appearance = useAppearance(); // получить текущую тему

  return (
    <div className={style.root} onClick={() => onClick()}>
      <div
        className={`
          ${style.card} 
          ${flipped ? style.flipped : ""} `}
      >
        <div
          className={`
          ${style.front} 
          ${appearance === "light" ? style.card__light : style.card__dark}`}
        >
          <div className={style.card__front_header}>
            <div className={style.card__title}>Вопрос</div>
            <div className={style.card__number}>
              {currentQuestion + 1}/{cardArray.length}
            </div>
          </div>
          <div
            className={clsx(style.question, {
              [style.question__light]: appearance === "light",
              [style.question__dark]: appearance !== "light",
            })}
          >
            {question}
          </div>
          <div className={style.img__row}>
            <img className={style.img} src={kaban} />
          </div>
        </div>

        <div
          className={`
          ${style.back}  
          ${appearance === "light" ? style.card__light : style.card__dark}`}
        >
          <div className={style.card__front_header}>
            <div className={style.card__title}>Ответ</div>
          </div>
          <div
            className={clsx(style.question, {
              [style.question__light]: appearance === "light",
              [style.question__dark]: appearance !== "light",
            })}
          >
            {answer}
          </div>

          <div
            className={clsx(style.card__back_bottom, {
              [style.back_bottom__text_light]: appearance === "light",
              [style.back_bottom__text_dark]: appearance !== "light",
            })}
          >
            <Icon20ErrorCircle />
            Чекнуть теорию
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
  card: PropTypes.object,
  currentQuestion: PropTypes.number,
  onClick: PropTypes.func,
  flipped: PropTypes.bool,
};
