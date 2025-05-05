import { Panel, Tabbar, PanelHeader, Button } from "@vkontakte/vkui";
import PropTypes from "prop-types";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import MyTabbar from "../Components/MyTabbar/MyTabbar";
import Title from "../Components/Title/Title";
import MainContainer from "../Components/MainContainer/MainContainer";
import { TestCard } from "../Components/TestCard/TestCard";
import { BlockedModal } from "../Components/BlockedModal/BlockedModal";

import kabanNormal from "../assets/Kabans/kaban-busy.svg";
import kabanAngry from "../assets/Kabans/kaban-angry.svg";
import kabanGood from "../assets/Kabans/kaban-strong.svg";

import { useState } from "react";
import clsx from "clsx";

import "../styles/testTopic.css";
import { Icon20ErrorCircle } from "@vkontakte/icons";
import { useAppearance } from "@vkontakte/vk-bridge-react";
import { useTest } from "../hooks/useTest";

export const TestTopic = ({ id }) => {
  const [activeTest, setActiveTest] = useState(0);
  const { topic, direction, subject } = useParams();
  const appearance = useAppearance();
  // const directions = [
  //   {
  //     title: "Основы HTML",

  //   {
  //     title: "Форматирование текста",
  //     tests: [
  //       {
  //         question: "Какой тег делает текст жирным без семантической важности?",
  //         answer: "<b>",
  //         variant: ["<b>", "<strong>", "<bold>", "<em>"],
  //       },
  //       {
  //         question: "Чем отличается <strong> от <b>?",
  //         answer:
  //           "<strong> указывает на важность текста, <b> — просто жирное начертание",
  //         variant: [
  //           "Ничем, это синонимы",
  //           "<strong> указывает на важность текста, <b> — просто жирное начертание",
  //           "<b> работает только в старых браузерах",
  //           "<strong> нельзя использовать внутри <p>",
  //         ],
  //       },
  //       {
  //         question:
  //           "Какой тег делает текст курсивом без семантического акцента?",
  //         answer: "<i>",
  //         variant: ["<i>", "<em>", "<italic>", "<cursive>"],
  //       },
  //       {
  //         question: "Когда стоит использовать <em>?",
  //         answer: "Для текста, который нужно интонационно выделить",
  //         variant: [
  //           "Для всех курсивных слов",
  //           "Только внутри таблиц",
  //           "Для цитат",
  //           "Для текста, который нужно интонационно выделить",
  //         ],
  //       },
  //       {
  //         question: "Какой тег подчёркивает текст?",
  //         answer: "<u>",
  //         variant: ["<ins>", "<u>", "<underline>", "<strike>"],
  //       },
  //       {
  //         question: "Какой тег зачёркивает текст?",
  //         answer: "<s>",
  //         variant: ["<s>", "<del>", "<strike>", "<u>"],
  //       },
  //       {
  //         question:
  //           "Какой тег создаёт верхний индекс (например, степень числа)?",
  //         answer: "<sup>",
  //         variant: ["<top>", "<sub>", "<up>", "<sup>"],
  //       },
  //       {
  //         question: "Какой тег используют для химических формул (H₂O)?",
  //         answer: "<sub>",
  //         variant: ["<sup>", "<sub>", "<low>", "<chem>"],
  //       },
  //       {
  //         question: "Какой тег сохраняет пробелы и переносы строк?",
  //         answer: "<pre>",
  //         variant: ["<pre>", "<code>", "<p>", "<plaintext>"],
  //       },
  //       {
  //         question: "Какой тег используется для цитирования длинного текста?",
  //         answer: "<blockquote>",
  //         variant: ["<p>", "<cite>", "<blockquote>", "<q>"],
  //       },
  //       {
  //         question: "Какой тег выделяет код программы?",
  //         answer: "<code>",
  //         variant: ["<program>", "<pre>", "<code>", "<script>"],
  //       },
  //       {
  //         question: "Какой код правильно оформляет текст: 'Важно: 2³ = 8'?",
  //         answer: "<p><strong>Важно:</strong> 2<sup>3</sup> = 8</p>",
  //         variant: [
  //           "<strong>Важно: 2<sup>3</sup> = 8</strong>",
  //           "<p><strong>Важно:</strong> 2<sup>3</sup> = 8</p>",
  //           "<b>Важно: 2<up>3</up> = 8</b>",
  //           "<em>Важно: 2<sub>3</sub> = 8</em>",
  //         ],
  //       },
  //     ],
  //   },
  // ];

  // const theme = directions.find((item) => item.title === topic);

  const [checked, setChecked] = useState(false); // выбрали вариант ответа
  const [uncorrectedAnswersCount, setUncorrectedAnswersCount] = useState(0);
  const routeNavigator = useRouteNavigator();

  const { tests, isLoading, error, countTests } = useTest(topic);
  console.log(topic);

  const handleUncorrectAnswer = (count) => {
    setUncorrectedAnswersCount(count);
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
      <MainContainer>
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
            />
            <Button
              stretched
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
            <div className="btns">
              <Button
                stretched
                onClick={() =>
                  routeNavigator.push(`/tests/${direction}/${subject}`)
                }
              >
                Перейти к следующей теме
              </Button>
            </div>
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
