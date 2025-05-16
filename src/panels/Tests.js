import { Panel, Tabbar, PanelHeader } from "@vkontakte/vkui";
import PropTypes from "prop-types";
import MyTabbar from "../Components/MyTabbar/MyTabbar";
import Title from "../Components/Title/Title";
import MainContainer from "../Components/MainContainer/MainContainer";
import Tile from "../Components/Tile/Tile";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useTestDirection } from "../hooks/useTestDirection";
import { BaseSkeleton } from "../Components/Skeletons/BaseSkeleton/BaseSkeleton";

export const Tests = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const { testDirection, isLoading, error } = useTestDirection();

  if (isLoading)
    return (
      <>
        <PanelHeader>Тесты</PanelHeader>
        <BaseSkeleton />
      </>
    );

  if (error) console.log(error);

  return (
    <Panel id={id}>
      <PanelHeader>Тесты</PanelHeader>
      <Title title={"Направления разработки"} />
      <MainContainer>
        {testDirection.map(({ direction, description, img }) => (
          <Tile
            key={direction}
            title={direction}
            text={description}
            img={img}
            onClick={() => routeNavigator.push(`/tests/${direction}`)}
          />
        ))}
      </MainContainer>
      <Tabbar>
        <MyTabbar />
      </Tabbar>
    </Panel>
  );
};

Tests.propTypes = {
  id: PropTypes.string.isRequired,
};
