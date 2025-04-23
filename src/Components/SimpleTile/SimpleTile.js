import PropTypes from "prop-types";
import style from "./SimpleTile.module.css";
import clsx from "clsx";
import { Icon28LockOutline } from "@vkontakte/icons";
import { useAppearance } from "@vkontakte/vk-bridge-react";

const SimpleTile = ({ title, block = true, onClick }) => {
  const appearance = useAppearance();

  return (
    <div
      className={clsx(style.simpleTile, {
        [style.simpleTile__light]: appearance === "light",
        [style.simpleTile__dark]: appearance !== "light",
      })}
      onClick={onClick}
    >
      <div
        className={clsx(style.title, {
          [style.title__light]: appearance === "light",
          [style.title__dark]: appearance !== "light",
        })}
      >
        {title}
      </div>
      {block && <Icon28LockOutline />}
    </div>
  );
};
export default SimpleTile;

SimpleTile.propTypes = {
  title: PropTypes.string,
  block: PropTypes.bool,
  onClick: PropTypes.func,
};
