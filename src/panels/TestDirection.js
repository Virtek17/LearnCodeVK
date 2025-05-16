import { Panel, Tabbar, PanelHeader, Button } from "@vkontakte/vkui";
import PropTypes from "prop-types";
import MyTabbar from "../Components/MyTabbar/MyTabbar";
import Title from "../Components/Title/Title";
import MainContainer from "../Components/MainContainer/MainContainer";
import SimpleTile from "../Components/SimpleTile/SimpleTile";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Icon24ChevronLeftOutline } from "@vkontakte/icons";
import clsx from "clsx";
import { useTestLang } from "../hooks/useTestLang";
import { BaseSkeleton } from "../Components/Skeletons/BaseSkeleton/BaseSkeleton";

export const TestDirection = ({ id }) => {
  const { direction } = useParams(); // Получаем тему из URL

  const routeNavigator = useRouteNavigator();
  const { testLang, isLoading, error } = useTestLang(direction);

  if (isLoading) {
    return (
      <>
        <PanelHeader>Тесты по разделу</PanelHeader>
        <BaseSkeleton />
      </>
    );
  }

  if (error) {
    console.log(error);
  }

  return (
    <Panel id={id}>
      <PanelHeader>Тесты по разделу {direction}</PanelHeader>
      <Title title={"Если шаришь - докажи, тогда пойдем дальше"} />
      <MainContainer>
        <Button
          onClick={() => routeNavigator.back()}
          before={<Icon24ChevronLeftOutline />}
          mode="link"
          size="l"
        >
          <span className={clsx("btn")}>Назад</span>
        </Button>
        {testLang.test_lang.map(({ lang }) => (
          <SimpleTile
            key={lang}
            title={lang}
            onClick={() => routeNavigator.push(`/tests/${direction}/${lang}`)}
          />
        ))}
      </MainContainer>
      <Tabbar>
        <MyTabbar />
      </Tabbar>
    </Panel>
  );
};

TestDirection.propTypes = {
  id: PropTypes.string.isRequired,
};
