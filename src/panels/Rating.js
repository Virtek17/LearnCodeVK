// =========================
//            VK
// =========================
import { Panel, Tabbar, PanelHeader } from "@vkontakte/vkui";
import PropTypes from "prop-types";

// =========================
//          My
// =========================
import MyTabbar from "../Components/MyTabbar/MyTabbar";
import Title from "../Components/Title/Title";
import MainContainer from "../Components/MainContainer/MainContainer";
import { BaseSkeleton } from "../Components/Skeletons/BaseSkeleton/BaseSkeleton";
import RatingTile from "../Components/RatingTile/RatingTile";

// ========================
//          Other
// ========================
import { useRating } from "../hooks/useRating";

export const Rating = ({ id }) => {
  const { ratingList, isLoading, error } = useRating();

  if (isLoading)
    return (
      <>
        <PanelHeader>Рейтинг</PanelHeader>
        <BaseSkeleton />
      </>
    );

  if (error) {
    console.log("Ошибка загрузки рейтинга:", error);
    return (
      <Panel id={id}>
        <PanelHeader>Рейтинг</PanelHeader>
        <MainContainer>
          <div style={{ padding: 16 }}>
            Не удалось загрузить рейтинг. Попробуйте позже.
          </div>
        </MainContainer>
        <Tabbar>
          <MyTabbar />
        </Tabbar>
      </Panel>
    );
  }

  return (
    <Panel id={id}>
      <PanelHeader>Рейтинг</PanelHeader>
      <Title title="Таблица лидеров" />

      <MainContainer>
        {ratingList.map((user, index) => (
          <RatingTile
            key={index}
            name={user.name}
            points={user.points}
            photo={user.photo}
            number={index + 1}
          />
        ))}
      </MainContainer>

      <Tabbar>
        <MyTabbar />
      </Tabbar>
    </Panel>
  );
};

Rating.propTypes = {
  id: PropTypes.string.isRequired,
};
