//==========
// VK импорты
//==========
import { Panel, Tabbar, PanelHeader, Button } from "@vkontakte/vkui";
import PropTypes from "prop-types";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useAppearance } from "@vkontakte/vk-bridge-react";
import { Icon20ErrorCircle } from "@vkontakte/icons";

//==========
// Мои компоненты
//==========
import MyTabbar from "../Components/MyTabbar/MyTabbar";
import Title from "../Components/Title/Title";
import MainContainer from "../Components/MainContainer/MainContainer";
import { TestCard } from "../Components/TestCard/TestCard";
import { BlockedModal } from "../Components/BlockedModal/BlockedModal";
import "../styles/testTopic.css";
import { useTest } from "../hooks/useTest";
import kabanNormal from "../assets/Kabans/kaban-busy.svg";
import kabanAngry from "../assets/Kabans/kaban-angry.svg";
import kabanGood from "../assets/Kabans/kaban-strong.svg";
//==========
// React импорты
//==========
import { useState } from "react";
import clsx from "clsx";
import { useUpdateProgress } from "../hooks/useUpdateProgress";
import { useUser } from "../hooks/useUser";
import { getTestSubjectId } from "../utils/getTestSubjectId";

export const TestTopic = ({ id }) => {
  const { user, isLoadings, errors } = useUser(); // получаю юзера

  const [activeTest, setActiveTest] = useState(0);
  const { topic, direction, subject } = useParams();
  const [checked, setChecked] = useState(false); // выбрали вариант ответа
  const [uncorrectedAnswersCount, setUncorrectedAnswersCount] = useState(0);

  const { tests, isLoading, error, countTests } = useTest(topic);
  const { updateProgress } = useUpdateProgress();

  const [canNext, setCanNext] = useState(true);
  const routeNavigator = useRouteNavigator();
  const appearance = useAppearance();

  const handleUncorrectAnswer = (count) => {
    setUncorrectedAnswersCount(count);
  };

  const handleCanNext = (can) => {
    setCanNext(can);
  };

  // проверить ответ
  const checkAnswer = () => {
    setChecked(true);
  };

  const nextQuestion = () => {
    setActiveTest(activeTest + 1);
    setChecked(false);
  };

  // сделать скелетон для тестов
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    console.log(error);
  }

  if (tests.length == 0) {
    return <BlockedModal />;
  }

  let correctAnswersCount = countTests - uncorrectedAnswersCount;
  let procentCorrectAnswer = (correctAnswersCount * 100) / countTests;

  return (
    <Panel id={id}>
      <PanelHeader>Тесты</PanelHeader>
      <Title title={topic} />
      <MainContainer className="testContainer">
        {countTests > activeTest ? (
          <>
            <div className="test-header">
              <div className="title">Вопрос: </div>
              <div
                className={clsx("count", {
                  ["count__light"]: appearance === "light",
                  ["count__dark"]: appearance !== "light",
                })}
              >
                {activeTest + 1} / {countTests}
              </div>
            </div>

            <TestCard
              question={tests[activeTest].question}
              answer={tests[activeTest].answer}
              variant={tests[activeTest].variant}
              checked={checked}
              onUncorrectedAnswer={handleUncorrectAnswer} // передаем callback
              handleCanNext={handleCanNext}
            />
            <Button
              className="mainBtn"
              disabled={canNext}
              onClick={() => (checked ? nextQuestion() : checkAnswer())}
            >
              {checked ? "Далее" : "Проверить"}
            </Button>
          </>
        ) : (
          <div className="testEnd">
            <div className="testEnd__content">
              <div className="end-title">
                {procentCorrectAnswer >= 90
                  ? "Ну ты внатуре кабан"
                  : procentCorrectAnswer <= 40
                  ? "Боже ты вообще не готов"
                  : "Старайся лучше!"}
              </div>
              <div
                className={clsx("result", {
                  ["good"]: procentCorrectAnswer >= 90,
                  ["bad"]: procentCorrectAnswer <= 40,
                  ["normal"]:
                    procentCorrectAnswer > 40 && procentCorrectAnswer < 90,
                })}
              >
                {correctAnswersCount} / {countTests}
              </div>
              <div className="img">
                <img
                  src={
                    procentCorrectAnswer >= 90
                      ? kabanGood
                      : procentCorrectAnswer <= 40
                      ? kabanAngry
                      : kabanNormal
                  }
                  alt="img kaban"
                />
              </div>
              <div className="bottom">
                <Icon20ErrorCircle />
                Чекнуть теорию
              </div>
            </div>
            {procentCorrectAnswer >= 90 ? (
              // прошел хоршо -> кидает на следующий тест и запись в бд
              <div className="btns">
                <Button
                  stretched
                  onClick={async () => {
                    const subjectId = await getTestSubjectId(topic); // получаем ID темы
                    await updateProgress(user.id, subjectId);
                    routeNavigator.push(`/tests/${direction}/${subject}`);
                  }}
                >
                  Перейти к следующей теме
                </Button>
              </div>
            ) : (
              // если прошел плохо -> кидает на теорию
              <div className="btns">
                <Button
                  stretched
                  onClick={() => routeNavigator.push(`/theory`)}
                >
                  Пойти готовиться
                </Button>
              </div>
            )}
          </div>
        )}
      </MainContainer>
      <Tabbar>
        <MyTabbar />
      </Tabbar>
    </Panel>
  );
};

TestTopic.propTypes = {
  id: PropTypes.string.isRequired,
};
