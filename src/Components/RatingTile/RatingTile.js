import clsx from "clsx";
import style from "./RatingTile.module.css";
import { useAppearance } from "@vkontakte/vk-bridge-react";
import PropTypes from "prop-types";

const RatingTile = ({ name, points, photo, number }) => {
  const appearance = useAppearance();
  console.log(appearance);

  return (
    <div
      className={clsx(style.wrapper, {
        [style.wrapper__light]: appearance === "light",
        [style.wrapper__dark]: appearance !== "light",
      })}
    >
      <div className={style.userInfo}>
        <div
          className={clsx(style.number, {
            [style.number__light]: appearance === "light",
            [style.number__dark]: appearance !== "light",
          })}
        >
          {number}
        </div>
        <div className={style.user}>
          <img src={photo} className={style.photo} />
          <div className={style.name}>{name}</div>
        </div>
      </div>
      <div className={style.points}>{points} XP</div>
    </div>
  );
};

export default RatingTile;

RatingTile.propTypes = {
  name: PropTypes.string,
  points: PropTypes.number,
  photo: PropTypes.any,
  number: PropTypes.number,
};
