import { Panel, Tabbar, PanelHeader, Button } from "@vkontakte/vkui";
import PropTypes from "prop-types";
import MyTabbar from "../Components/MyTabbar/MyTabbar";
import Title from "../Components/Title/Title";
import MainContainer from "../Components/MainContainer/MainContainer";
import SimpleTile from "../Components/SimpleTile/SimpleTile";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Icon24ChevronLeftOutline } from "@vkontakte/icons";
import clsx from "clsx";

export const TestSubject = ({ id }) => {
  const { direction, subject } = useParams(); // Получаем тему из URL
  const routeNavigator = useRouteNavigator();
  const directions = [
    {
      title: "HTML",
      text: "Основы HTML",
      block: false,
    },
    {
      title: "HTML",
      text: "Форматирование текста",
      block: false,
    },
    {
      title: "HTML",
      text: "Ссылки и изображения",
      block: true,
    },
    {
      title: "HTML",
      text: "Списки",
      block: true,
    },
    {
      title: "HTML",
      text: "Таблицы",
      block: true,
    },
    {
      title: "HTML",
      text: "Формы",
      block: true,
    },
    {
      title: "HTML",
      text: "Семантическая вёрстка",
      block: true,
    },
    {
      title: "HTML",
      text: "Мультимедиа и интерактивные элементы",
      block: true,
    },
    {
      title: "HTML",
      text: "Мета-информация и SEO",
      block: true,
    },
    {
      title: "HTML",
      text: "Доступность (ARIA)",
      block: true,
    },
    {
      title: "CSS",
      text: "Тема 1 по css",
      block: false,
    },
    {
      title: "JavaScipt",
      text: "Тема 1 по js",
      block: false,
    },
  ];

  const theme = directions.find((item) => item.title === subject);
  const needDirection = directions.filter((item) => item.title === subject);

  if (!theme) {
    return <div>Тестов по {subject} нет</div>;
  }

  return (
    <Panel id={id}>
      <PanelHeader>Тесты</PanelHeader>
      <Title title={`Тесты по ${subject}`} />
      <MainContainer>
        <Button
          onClick={() => routeNavigator.back()}
          before={<Icon24ChevronLeftOutline />}
          mode="link"
          size="l"
        >
          <span className={clsx("btn")}>Назад</span>
        </Button>
        {needDirection.map(({ text, block }) => (
          <SimpleTile
            key={text}
            title={text}
            block={block}
            onClick={() => {
              if (!block) {
                routeNavigator.push(`/tests/${direction}/${subject}/${text}`);
              }
            }}
          />
        ))}
      </MainContainer>
      <Tabbar>
        <MyTabbar />
      </Tabbar>
    </Panel>
  );
};

TestSubject.propTypes = {
  id: PropTypes.string.isRequired,
};
