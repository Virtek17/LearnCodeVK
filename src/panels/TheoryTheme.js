// ===================
// VK
// ===================
import { Panel, PanelHeader, Tabbar } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useParams } from "@vkontakte/vk-mini-apps-router";
import PropTypes from "prop-types";

// ===================
// OTHERq
// ===================
import { useState } from "react";
// ===================
// MY
// ===================
import MyTabbar from "../Components/MyTabbar/MyTabbar.js";
import MainContainer from "../Components/MainContainer/MainContainer.js";
import Select from "../Components/Select/Select.js";
import SelectItem from "../Components/SelectItem/SelectItem.js";
import Title from "../Components/Title/Title.js";
import { useTheme } from "../hooks/useTheme.js";
import { MiniSkeleton } from "../Components/Skeletons/MiniSkeleton/MiniSkeleton.js";

export const TheoryTheme = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { theory_theme } = useParams(); // Получаем тему из URL
  const [activeSelect, setActiveSelect] = useState(null);
  const { theme, isLoading, error } = useTheme(theory_theme);
  const toggleSelect = (id) => {
    setActiveSelect((prevState) => (prevState === id ? null : id)); // Закрывает текущий, если он был открыт, или открывает новый
  };

  const handleSelectItemClick = (itemText) => {
    routeNavigator.push(`/theory/${theory_theme}/${itemText}`);
  };
  if (isLoading)
    return (
      <>
        <PanelHeader>Теория по {theory_theme}</PanelHeader>
        <MiniSkeleton />
      </>
    );
  if (error) console.log(error);

  if (!theme.theory_theme) {
    return (
      <div>
        <h1>Теории по теме нет</h1>
        <Tabbar>
          <MyTabbar />
        </Tabbar>
      </div>
    );
  }

  return (
    <Panel id={id}>
      <PanelHeader>Теория по {theme.name}</PanelHeader>

      {theme.name && <Title title={theme.name} />}
      <MainContainer>
        {theme.theory_theme.map(({ title, icon_name, theory_topic }) => (
          <Select
            key={title}
            id={title}
            placeholder={title}
            icon={icon_name}
            active={activeSelect === title}
            onToggle={() => toggleSelect(title)}
          >
            {theory_topic.map(({ title, end, tag }) => (
              <SelectItem
                key={title}
                text={title}
                end={end}
                tag={tag}
                onClick={() => handleSelectItemClick(title)}
              />
            ))}
          </Select>
        ))}
      </MainContainer>
      <Tabbar>
        <MyTabbar />
      </Tabbar>
    </Panel>
  );
};

TheoryTheme.propTypes = {
  id: PropTypes.string.isRequired,
};
