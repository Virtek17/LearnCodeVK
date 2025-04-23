import PropTypes from "prop-types";
import style from "./SelectItem.module.css";
import { useAppearance } from "@vkontakte/vk-bridge-react";
import clsx from "clsx";

const SelectItem = ({ text, end = false, tag = false, onClick }) => {
  const appearance = useAppearance();
  return (
    <div
      className={clsx(style.select, {
        [style.select__light]: appearance === "light",
        [style.select__dark]: appearance !== "light",
      })}
      onClick={onClick}
    >
      <div
        className={clsx(style.select_item, {
          [style.select_item__light]: appearance === "light",
          [style.select_item__dark]: appearance !== "light",
        })}
      >
        <div
          className={clsx({
            [style.select_item__bracket__light]: appearance === "light",
            [style.select_item__bracket__dark]: appearance !== "light",
          })}
        >
          {tag ? "<" : ""}
        </div>
        <div
          className={clsx({
            [style.select_item__text__light]: appearance === "light",
            [style.select_item__text__dark]: appearance !== "light",
          })}
        >
          {text}
        </div>
        <div
          className={clsx({
            [style.select_item__bracket__light]: appearance === "light",
            [style.select_item__bracket__dark]: appearance !== "light",
          })}
        >
          {tag ? (end ? "/>" : ">") : ""}
        </div>
      </div>
    </div>
  );
};

export default SelectItem;

SelectItem.propTypes = {
  text: PropTypes.string.isRequired,
  end: PropTypes.bool,
  tag: PropTypes.bool,
  onClick: PropTypes.func,
};
