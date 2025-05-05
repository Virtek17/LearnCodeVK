import clsx from "clsx";
import style from "./BlockedModal.module.css";
import { useAppearance } from "@vkontakte/vk-bridge-react";
import { Icon24LockOutline } from "@vkontakte/icons";
import { Button } from "@vkontakte/vkui";
import kaban from "../../assets/Kabans/kaban-busy.svg";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
export const BlockedModal = () => {
  const appearance = useAppearance();
  const routeNavigator = useRouteNavigator();
  return (
    <div className={style.wrapper}>
      <img src={kaban} className={style.img} />
      <div
        className={clsx(style.icon, {
          [style.icon__light]: appearance === "light",
          [style.icon__dark]: appearance !== "light",
        })}
      >
        <Icon24LockOutline />
      </div>
      <div
        className={clsx(style.title, {
          [style.title__light]: appearance === "light",
          [style.title__dark]: appearance !== "light",
        })}
      >
        Э, шустрый!
      </div>
      <div
        className={clsx(style.text, {
          [style.text__light]: appearance === "light",
          [style.text__dark]: appearance !== "light",
        })}
      >
        Тут пока пусто. Разработка идёт, скоро будет движ.
      </div>
      <div className={style.btn}>
        <Button stretched onClick={() => routeNavigator.back()}>
          <span>Ок</span>
        </Button>
      </div>
    </div>
  );
};
