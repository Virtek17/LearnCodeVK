import { Panel, Tabbar, PanelHeader } from "@vkontakte/vkui";
import PropTypes from "prop-types";
import MyTabbar from "../Components/MyTabbar/MyTabbar";
import Title from "../Components/Title/Title";
import MainContainer from "../Components/MainContainer/MainContainer";
import Tile from "../Components/Tile/Tile";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import supabase from "../service/supabase.js";
import { useEffect, useState } from "react";

export const Theory = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      const { data, error } = await supabase
        .from("lang_theory")
        .select("name , description, img");

      if (error) {
        console.error("Ошибка при получении данных:", error);
      } else {
        setLanguages(data); // сохраняем данные в state
      }
    };

    fetchLanguages();
  }, []);

  // const listTheoryLanguage = [
  //   { title: "HTML", text: "Структура веб страницы", img: "kabanThinking" },
  //   { title: "CSS", text: "Стили и оформление", img: "kabanSmart" },
  //   { title: "JavaScript", text: "DOM и интерактивность", img: "kabanStrong" },
  //   { title: "React", text: "Фреймворк js", img: "kabanRich" },
  //   { title: "Vue", text: "Фреймворк js", img: "kabanBackend" },
  //   { title: "SCSS", text: "Фреймворк CSS", img: "kabanBusy" },
  // ];

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
            onClick={() => routeNavigator.go(`/theoryTopic/${name}`)}
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
