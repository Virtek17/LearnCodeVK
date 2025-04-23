import PropTypes from "prop-types";
import style from "./TestCard.module.css";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useAppearance } from "@vkontakte/vk-bridge-react";

export const TestCard = ({
  question,
  answer,
  variant,
  checked,
  onUncorrectedAnswer,
}) => {
  const appearance = useAppearance();
  const [selectedOption, setSelectedOption] = useState(null);
  const [countUncorrectAnswer, setCountUncorrectAnswer] = useState(0);

  const handleOptionChange = (index) => {
    if (!checked) {
      setSelectedOption(index);
    }
  };
  useEffect(() => {
    if (checked === false) {
      setSelectedOption(null);
    }
    if (isWrongAnswerSelected === true) {
      let newCount = countUncorrectAnswer + 1;
      setCountUncorrectAnswer(newCount);
      onUncorrectedAnswer(newCount);
    }
  }, [checked]);

  // Нормализуем строки для сравнения
  const normalize = (str) => str.trim().toLowerCase();
  const normalizedAnswer = normalize(answer);
  const isWrongAnswerSelected =
    checked &&
    selectedOption !== null &&
    normalize(variant[selectedOption]) !== normalizedAnswer;

  return (
    <div className={style.testCard}>
      {/* <span>Количество ошибок: {countUncorrectAnswer}</span> */}
      <div
        className={clsx(style.question, {
          [style.question__light]: appearance === "light",
          [style.question__dark]: appearance !== "light",
        })}
      >
        {question}
      </div>

      <ul className={style.variants}>
        {variant &&
          variant.map((element, index) => {
            const isCorrectAnswer = normalize(element) === normalizedAnswer;
            const isSelected = selectedOption === index;

            return (
              <li
                key={index}
                className={clsx(style.variants__item, {
                  [style.variants__item__correct]:
                    checked &&
                    (isCorrectAnswer ||
                      (isWrongAnswerSelected && isCorrectAnswer)),
                  [style.variants__item__uncorrect]:
                    checked && isSelected && !isCorrectAnswer,

                  [style.variants__item__selected]: !checked && isSelected,
                  [style.variants__item__light]: appearance === "light",
                  [style.variants__item__dark]: appearance !== "light",
                })}
                onClick={() => handleOptionChange(index)}
              >
                <input
                  id={`radio${index}`}
                  type="radio"
                  checked={isSelected}
                  onChange={() => {}}
                  readOnly
                />
                <label
                  htmlFor={`radio${index}`}
                  className={style.label}
                ></label>
                <div>{element}</div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

TestCard.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
  variant: PropTypes.array,
  checked: PropTypes.bool,
  onUncorrectedAnswer: PropTypes.func,
};
