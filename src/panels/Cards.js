import { Panel, Tabbar, PanelHeader } from "@vkontakte/vkui";
import PropTypes from "prop-types";
import MyTabbar from "../Components/MyTabbar/MyTabbar";
import Tile from "../Components/Tile/Tile";
import Title from "../Components/Title/Title";
import MainContainer from "../Components/MainContainer/MainContainer";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export const Cards = ({ id }) => {
  const tiles = [
    {
      title: "html",
      text: "Структура веб страницы",
      countAllCards: 200,
      countFinishCards: 100,
      img: "kabanAngry",
    },
    {
      title: "css",
      text: "Стили и оформление",
      countAllCards: 300,
      countFinishCards: 50,
      img: "kabanBusy",
    },
    {
      title: "JavaScript",
      text: "DOM и интерактивность",
      countAllCards: 100,
      countFinishCards: 80,
      img: "kabanRich",
    },
  ];

  const routeNavigator = useRouteNavigator();
  return (
    <Panel id={id}>
      <PanelHeader>Карточки</PanelHeader>
      <Title title="Выбери язык программирования" />

      <MainContainer>
        {tiles.map(({ title, text, img, countAllCards, countFinishCards }) => (
          <Tile
            key={title}
            title={title}
            text={text}
            img={img}
            progress={countFinishCards}
            maxProgress={countAllCards}
            onClick={() => routeNavigator.go(`/cardTopic/${title}`)}
          />
        ))}
      </MainContainer>

      <Tabbar>
        <MyTabbar />
      </Tabbar>
    </Panel>
  );
};
Cards.propTypes = {
  id: PropTypes.string.isRequired,
};
