import { Panel, PanelHeader, Tabbar } from "@vkontakte/vkui";
// import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import PropTypes from "prop-types";
import MainHeader from "../Components/MainHeader/MainHeader";
import MyTabbar from "../Components/MyTabbar/MyTabbar";
import MainContainer from "../Components/MainContainer/MainContainer";
import { PhraseDay } from "../Components/PhraseDay/PhraseDay";
// import { useUser } from "../hooks/useUser";
import { useOnboarding } from "../hooks/useOnboarding";
import { OnBoard } from "../Components/OnboardCustom/OnBoard";

export const Home = ({ id }) => {
  // Получаем данные о пользователе
  // const { user, isLoading, error } = useUser();
  const { isShow, completeOnboarding } = useOnboarding();

  console.log(isShow);
  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>

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
