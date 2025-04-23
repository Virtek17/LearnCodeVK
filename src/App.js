import { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import { View, SplitLayout, SplitCol, ScreenSpinner } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import {
  Persik,
  Home,
  Cards,
  CardTopic,
  Theory,
  TheoryTopic,
  TheoryItemPage,
  Tests,
  TestDirection,
  TestSubject,
  TestTopic,
} from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState();
  const [popout, setPopout] = useState(<ScreenSpinner />);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" fetchedUser={fetchedUser} />
          <Persik id="persik" />
          <Cards id="cards" />
          <CardTopic id="cardTopic" />
          <Theory id="theory" />
          <TheoryTopic id="theoryTopic" />
          <TheoryItemPage id="theoryItemPage" />
          <Tests id="tests" />
          <TestDirection id="testDirection" />
          <TestSubject id="testSubject" />
          <TestTopic id="testTopic" />
        </View>
      </SplitCol>
      {popout}
    </SplitLayout>
  );
};
