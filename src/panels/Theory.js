// =========================
//            VK
// =========================
import { Panel, Tabbar, PanelHeader } from "@vkontakte/vkui";
import PropTypes from "prop-types";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

// =========================
//          My
// =========================
import MyTabbar from "../Components/MyTabbar/MyTabbar";
import Title from "../Components/Title/Title";
import MainContainer from "../Components/MainContainer/MainContainer";
import Tile from "../Components/Tile/Tile";
import { BaseSkeleton } from "../Components/Skeletons/BaseSkeleton/BaseSkeleton.js";

// ========================
//          Other
// ========================
import { useTheory } from "../hooks/useTheory.js";

export const Theory = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { languages, isLoading, error } = useTheory();

  if (isLoading)
    return (
      <>
        <PanelHeader>Теория</PanelHeader>
        <BaseSkeleton />
      </>
    );

  if (error) console.log(error);

  return (
    <Panel id={id}>
      <PanelHeader>Теория</PanelHeader>
      <Title title="Выбери язык программирования" />

      <MainContainer>
        {languages.map(({ name, description, img }) => (
          <Tile
            key={name}
            title={name}
            img={img}
            text={description}
            onClick={() => routeNavigator.go(`/theory/${name}`)}
          />
        ))}
      </MainContainer>

      <Tabbar>
        <MyTabbar />
      </Tabbar>
    </Panel>
  );
};

Theory.propTypes = {
  id: PropTypes.string.isRequired,
};
