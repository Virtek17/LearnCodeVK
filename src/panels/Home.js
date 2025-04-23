import { Panel, PanelHeader, Tabbar } from "@vkontakte/vkui";
// import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import PropTypes from "prop-types";
import MainHeader from "../Components/MainHeader/MainHeader";
import MyTabbar from "../Components/MyTabbar/MyTabbar";
import MainContainer from "../Components/MainContainer/MainContainer";

export const Home = ({ id }) => {
  // const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>

      <MainContainer>
        <MainHeader day={10} place={5} />
      </MainContainer>
      <Tabbar>
        <MyTabbar />
      </Tabbar>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
};
