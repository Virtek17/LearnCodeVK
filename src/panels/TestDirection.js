import { Panel, Tabbar, PanelHeader, Button } from "@vkontakte/vkui";
import PropTypes from "prop-types";
import MyTabbar from "../Components/MyTabbar/MyTabbar";
import Title from "../Components/Title/Title";
import MainContainer from "../Components/MainContainer/MainContainer";
import SimpleTile from "../Components/SimpleTile/SimpleTile";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Icon24ChevronLeftOutline } from "@vkontakte/icons";
import clsx from "clsx";

export const TestDirection = ({ id }) => {
  const { direction } = useParams(); // Получаем тему из URL

  const routeNavigator = useRouteNavigator();
  const directions = [
    {
      direction: "Frontend",
      title: "HTML",
      block: false,
    },
    {
      direction: "Frontend",
      title: "CSS",
      block: true,
    },
    {
      direction: "Frontend",
      title: "JavaScript",
      block: true,
    },
    {
      direction: "Backend",
      title: "PHP",
      block: true,
    },
    {
      direction: "Backend",
      title: "SQL",
      block: true,
    },
    {
      direction: "Backend",
      title: "Wordpress",
      block: true,
    },
  ];

  const theme = directions.find((item) => item.direction === direction);
  const needDirection = directions.filter(
    (item) => item.direction === direction
  );

  if (!theme) {
    return <div>Тестов по {direction} нет</div>;
  }

  return (
    <Panel id={id}>
      <PanelHeader>Тесты по теме {direction}</PanelHeader>
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
        {needDirection.map(({ title, block }) => (
          <SimpleTile
            key={title}
            title={title}
            block={block}
            onClick={() => routeNavigator.push(`/tests/${direction}/${title}`)}
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
