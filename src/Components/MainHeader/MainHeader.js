import PropTypes from "prop-types";
import style from "./MainHeader.module.css";
import { Icon24CupOutline, Icon24FireAltOutline } from "@vkontakte/icons";
import { useAppearance } from "@vkontakte/vk-bridge-react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import clsx from "clsx";

const MainHeader = ({ day, place }) => {
  const appearance = useAppearance();
  const routeNavigator = useRouteNavigator();

  const handleClick = () => {
    routeNavigator.push("/rating");
  };

  return (
    <div
      className={clsx(style.header, {
        [style.header__light]: appearance === "light",
        [style.header__dark]: appearance === "dark",
      })}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className={style.days}>
        <div className={style.icon}>
          <Icon24FireAltOutline />
        </div>
        {day} дней
      </div>
      <div className={style.place}>
        <div className={style.icon}>
          <Icon24CupOutline />
        </div>
        {place} место
      </div>
    </div>
  );
};

export default MainHeader;

MainHeader.propTypes = {
  day: PropTypes.number.isRequired,
  place: PropTypes.number.isRequired,
};