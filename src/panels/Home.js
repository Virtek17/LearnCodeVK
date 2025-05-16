import { Panel, PanelHeader, Tabbar } from "@vkontakte/vkui";
// import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import PropTypes from "prop-types";
import MainHeader from "../Components/MainHeader/MainHeader";
import MyTabbar from "../Components/MyTabbar/MyTabbar";
import MainContainer from "../Components/MainContainer/MainContainer";
import { PhraseDay } from "../Components/PhraseDay/PhraseDay";
import { useOnboarding } from "../hooks/useOnboarding";
import { OnBoard } from "../Components/OnboardCustom/OnBoard";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export const Home = ({ id }) => {
  const { isShow, completeOnboarding } = useOnboarding();
  const routeNavigator = useRouteNavigator();
  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      <button onClick={() => routeNavigator.go(`/rating`)}>Рейтинг</button>
      <MainContainer>
        <MainHeader day={10} place={5} />
        <PhraseDay />
        {isShow && <OnBoard onClose={completeOnboarding} />}
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
