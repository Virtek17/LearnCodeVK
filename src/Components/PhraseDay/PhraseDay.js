import PropTypes from "prop-types";
import kaban from "../../assets/Kabans/kaban-busy.svg";
import style from "./PhraseDay.module.css";
import clsx from "clsx";
import { useAppearance } from "@vkontakte/vk-bridge-react";
import { usePhrase } from "../../hooks/usePhrase";

export const PhraseDay = () => {
  const appearance = useAppearance();
  const { phrase, isLoading, error } = usePhrase();

  if (isLoading) return <div>Заргрузка...</div>;
  if (error) return <div>Ошибка!</div>;

  console.log(phrase);
  return (
    <div className={style.wrapper}>
      <div
        className={clsx(style.title, {
          [style.title__light]: appearance === "light",
          [style.title__dark]: appearance !== "light",
        })}
      >
        Фраза дня:{" "}
      </div>
      <div
        className={clsx(style.text, {
          [style.text__light]: appearance === "light",
          [style.text__dark]: appearance !== "light",
        })}
      >
        {phrase}
      </div>
      <img src={kaban} className={style.img} />
    </div>
  );
};

PhraseDay.propTypes = {
  id: PropTypes.string,
};
