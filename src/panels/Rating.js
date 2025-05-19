import { Panel, Tabbar, PanelHeader } from "@vkontakte/vkui";
import PropTypes from "prop-types";

import MyTabbar from "../Components/MyTabbar/MyTabbar";
import Title from "../Components/Title/Title";
import MainContainer from "../Components/MainContainer/MainContainer";
import { BaseSkeleton } from "../Components/Skeletons/BaseSkeleton/BaseSkeleton";
import RatingTile from "../Components/RatingTile/RatingTile";

import { useRating } from "../hooks/useRating";

export const Rating = ({ id }) => {
  const { ratingData, isLoading } = useRating(); // <-- Получаем данные из нового хука

  if (isLoading) {
    return (
      <Panel id={id}>
        <PanelHeader>Рейтинг</PanelHeader>
        <BaseSkeleton />
      </Panel>
    );
  }

  const { top5, currentUser, isUserInTop5 } = ratingData;

  return (
    <Panel id={id}>
      <PanelHeader>Рейтинг</PanelHeader>
      <Title title="Таблица лидеров" />

      <MainContainer>
        {/* Рендерим ТОП-5 */}
        {top5.map((user, index) => (
          <RatingTile
            key={user.id} // лучше использовать ID вместо индекса
            name={user.name}
            points={user.points}
            photo={user.photo}
            number={index + 1}
          />
        ))}

        {/* Показываем пользователя, если он не в ТОП-5 */}
        {!isUserInTop5 && currentUser && (
          <>
            <RatingTile
              name="Ваша позиция"
              points={currentUser.points}
              photo={currentUser.photo}
              number={currentUser.position}
              isCurrentUser={true}
            />
          </>
        )}
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