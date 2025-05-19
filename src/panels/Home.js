import { Panel, PanelHeader, Tabbar } from "@vkontakte/vkui";
// import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import PropTypes from "prop-types";
import MainHeader from "../Components/MainHeader/MainHeader";
import MyTabbar from "../Components/MyTabbar/MyTabbar";
import MainContainer from "../Components/MainContainer/MainContainer";
import { PhraseDay } from "../Components/PhraseDay/PhraseDay";
import { useOnboarding } from "../hooks/useOnboarding";
import { OnBoard } from "../Components/OnboardCustom/OnBoard";
import { useUser } from "../hooks/useUser";
import Loader from "../Components/Loader/Loader";

export const Home = ({ id }) => {
  const { isShow, completeOnboarding } = useOnboarding();
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return <Loader/>;
  }

  if (error) {
    // TODO: Добавить ошибку
    return <div>Error: {error.message}</div>;
  }

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      <MainContainer>
        <MainHeader day={user?.points} place={5} />
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
