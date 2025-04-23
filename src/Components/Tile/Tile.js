import PropTypes from "prop-types";

import { useAppearance } from "@vkontakte/vk-bridge-react";
import clsx from "clsx";
import style from "./tile.module.css";

import kabanFrontend from "../../assets/Kabans/kaban-frontend.svg";
import kabanBackend from "../../assets/Kabans/kaban-backend.svg";
import kabanThinking from "../../assets/Kabans/kaban-thinking.svg";
import kabanAngry from "../../assets/Kabans/kaban-angry.svg";
import kabanSmart from "../../assets/Kabans/kaban-smart.svg";
import kabanStrong from "../../assets/Kabans/kaban-strong.svg";
import kabanRich from "../../assets/Kabans/kaban-rich.svg";
import kabanBusy from "../../assets/Kabans/kaban-busy.svg";

const imgMap = {
  kabanFrontend,
  kabanBackend,
  kabanThinking,
  kabanAngry,
  kabanSmart,
  kabanStrong,
  kabanRich,
  kabanBusy,
};

const Tile = ({ title, text, img, progress, maxProgress = null, onClick }) => {
  const color = (progress, maxProgress) => {
    const procentDone = (parseInt(progress) / parseInt(maxProgress)) * 100;

    if (procentDone <= 40) {
      return "#EB4250";
    } else if (procentDone <= 70) {
      return "#FFA000";
    } else {
      return "#4CD964";
    }
  };

  const appearance = useAppearance();

  return (
    <div className={style.tile} onClick={() => onClick()}>
      <div className={style.wrapper}>
        <div className={style.title}>{title}</div>
        <div
          className={clsx(style.text, {
            [style.text__light]: appearance === "light",
            [style.text__dark]: appearance !== "light",
          })}
        >
          {text}
        </div>
        <img src={imgMap[img]} className={style.img} />
      </div>

      {progress !== undefined && (
        <div className={style.progressBarBg}>
          <div
            className={style.progressBar}
            style={{
              width: `${(progress / maxProgress) * 100}%`,
              backgroundColor: color(progress, maxProgress),
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Tile;
Tile.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  img: PropTypes.string,
  progress: PropTypes.number,
  maxProgress: PropTypes.number,
  onClick: PropTypes.func,
};
