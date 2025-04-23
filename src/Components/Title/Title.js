import PropTypes from "prop-types";
import style from "./Title.module.css";
import { useAppearance } from "@vkontakte/vk-bridge-react";
import clsx from "clsx";

// const appearance = useAppearance();

const Title = ({ title }) => {
  const appearance = useAppearance();
  return (
    <div
      // className={style.title}
      className={clsx(style.title, {
        [style.title__light]: appearance === "light",
        [style.title__dark]: appearance !== "light",
      })}
    >
      {title}
    </div>
  );
};

export default Title;
Title.propTypes = {
  title: PropTypes.string.isRequired, // Ожидаем число, обязательный пропс
};
