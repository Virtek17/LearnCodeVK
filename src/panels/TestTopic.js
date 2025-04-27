import { Panel, Tabbar, PanelHeader, Button } from "@vkontakte/vkui";
import PropTypes from "prop-types";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import MyTabbar from "../Components/MyTabbar/MyTabbar";
import Title from "../Components/Title/Title";
import MainContainer from "../Components/MainContainer/MainContainer";
import { TestCard } from "../Components/TestCard/TestCard";
import kabanNormal from "../assets/Kabans/kaban-busy.svg";
import kabanAngry from "../assets/Kabans/kaban-angry.svg";
import kabanGood from "../assets/Kabans/kaban-strong.svg";

import { useState } from "react";
import clsx from "clsx";

import "../styles/testTopic.css";
import { Icon20ErrorCircle } from "@vkontakte/icons";
import { useAppearance } from "@vkontakte/vk-bridge-react";

export const TestTopic = ({ id }) => {
  const [activeTest, setActiveTest] = useState(0);
  const { topic, direction, subject } = useParams();
  const appearance = useAppearance();
  const directions = [
    {
      title: "Основы HTML",
      tests: [
        {
          question: "Какой тэг указывает на тип документа",
          answer: "<!DOCTYPE html>",
          variant: ["<!html>", "<document>", "<!DOCTYPE html>", "<html>"],
        },
        {
          question: "Какой тег является корневым элементом HTML-страницы?",
          answer: "<html>",
          variant: ["<head>", "<html>", "<body>", "<!DOCTYPE>"],
        },
        {
          question:
            "Какой раздел содержит метаинформацию о странице (например, заголовок, кодировку)",
          answer: "<head>",
          variant: ["<head>", "<body>", "<footer>", "<meta>"],
        },
        {
          question: "Где должен располагаться контент, видимый пользователю?",
          answer: "<body>",
          variant: ["<head>", "<body>", "<html>", "<!DOCTYPE>"],
        },
        {
          question:
            "Какой элемент определяет заголовок, отображаемый в строке заголовка или на вкладке браузера?",
          answer: "<title>",
          variant: ["<title>", "<body>", "<head>", "<meta>"],
        },
        {
          question: "Какой тег используется для самого важного заголовка?",
          answer: "<h1>",
          variant: ["<h1>", "<h2>", "<title>", "<header>"],
        },
        {
          question: "Сколько уровней заголовков существует в HTML?",
          answer: "6",
          variant: ["3", "5", "6", "4"],
        },
        {
          question: "Какой тег НЕ является заголовком?",
          answer: "",
          variant: ["<h3>", "<h5>", "<p>", "<h6>"],
        },
        {
          question: "Какой тег создаёт абзац?",
          answer: "<p>",
          variant: ["<a>", "<p>", "<br>", "<hr>"],
        },
        {
          question:
            "Какой тег используется для переноса строки без создания нового абзаца?",
          answer: "<br>",
          variant: ["<hr>", "<p>", "<div>", "<br>"],
        },
        {
          question: "Какой тег создаёт горизонтальную линию?",
          answer: "<hr>",
          variant: ["<line>", "<hr>", "<br>", "<p>"],
        },
        {
          question: "Как правильно добавить комментарий в HTML?",
          answer: "<!-- Это комментарий -->",
          variant: [
            "// Это комментарий",
            "/* Это комментарий */",
            "<!-- Это комментарий -->",
            "<! Это комментарий>",
          ],
        },
        {
          question: "Видны ли HTML-комментарии пользователю?",
          answer: "Только при просмотре кода страницы",
          variant: [
            "Да, они отображаются на странице",
            "Только если навести курсор",
            "Зависит от браузера",
            "Только при просмотре кода страницы",
          ],
        },
        {
          question: "Что произойдёт, если написать <h7>Текст</h7>?",
          answer: "Текст отобразится как обычный (без стилей заголовка)",
          variant: [
            "Браузер выведет ошибку",
            "Текст будет крупнее, чем в <h6>",
            "Текст отобразится как обычный (без стилей заголовка)",
            "Браузер проигнорирует этот тег",
          ],
        },
      ],
    },
    {
      title: "Форматирование текста",
      tests: [
        {
          question: "Какой тег делает текст жирным без семантической важности?",
          answer: "<b>",
          variant: ["<b>", "<strong>", "<bold>", "<em>"],
        },
        {
          question: "Чем отличается <strong> от <b>?",
          answer:
            "<strong> указывает на важность текста, <b> — просто жирное начертание",
          variant: [
            "Ничем, это синонимы",
            "<strong> указывает на важность текста, <b> — просто жирное начертание",
            "<b> работает только в старых браузерах",
            "<strong> нельзя использовать внутри <p>",
          ],
        },
        {
          question:
            "Какой тег делает текст курсивом без семантического акцента?",
          answer: "<i>",
          variant: ["<i>", "<em>", "<italic>", "<cursive>"],
        },
        {
          question: "Когда стоит использовать <em>?",
          answer: "Для текста, который нужно интонационно выделить",
          variant: [
            "Для всех курсивных слов",
            "Только внутри таблиц",
            "Для цитат",
            "Для текста, который нужно интонационно выделить",
          ],
        },
        {
          question: "Какой тег подчёркивает текст?",
          answer: "<u>",
          variant: ["<ins>", "<u>", "<underline>", "<strike>"],
        },
        {
          question: "Какой тег зачёркивает текст?",
          answer: "<s>",
          variant: ["<s>", "<del>", "<strike>", "<u>"],
        },
        {
          question:
            "Какой тег создаёт верхний индекс (например, степень числа)?",
          answer: "<sup>",
          variant: ["<top>", "<sub>", "<up>", "<sup>"],
        },
        {
          question: "Какой тег используют для химических формул (H₂O)?",
          answer: "<sub>",
          variant: ["<sup>", "<sub>", "<low>", "<chem>"],
        },
        {
          question: "Какой тег сохраняет пробелы и переносы строк?",
          answer: "<pre>",
          variant: ["<pre>", "<code>", "<p>", "<plaintext>"],
        },
        {
          question: "Какой тег используется для цитирования длинного текста?",
          answer: "<blockquote>",
          variant: ["<p>", "<cite>", "<blockquote>", "<q>"],
        },
        {
          question: "Какой тег выделяет код программы?",
          answer: "<code>",
          variant: ["<program>", "<pre>", "<code>", "<script>"],
        },
        {
          question: "Какой код правильно оформляет текст: 'Важно: 2³ = 8'?",
          answer: "<p><strong>Важно:</strong> 2<sup>3</sup> = 8</p>",
          variant: [
            "<strong>Важно: 2<sup>3</sup> = 8</strong>",
            "<p><strong>Важно:</strong> 2<sup>3</sup> = 8</p>",
            "<b>Важно: 2<up>3</up> = 8</b>",
            "<em>Важно: 2<sub>3</sub> = 8</em>",
          ],
        },
      ],
    },
  ];
  const theme = directions.find((item) => item.title === topic);
  const [checked, setChecked] = useState(false); // выбрали вариант ответа
  const [uncorrectedAnswersCount, setUncorrectedAnswersCount] = useState(0);
  const routeNavigator = useRouteNavigator();

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

  // const needDirection = directions.filter((item) => item.title === topic);

  if (!theme) {
    return <div>Тестов по {topic} нет</div>;
  }
  let correctAnswersCount = theme.tests.length - uncorrectedAnswersCount;
  let procentCorrectAnswer = (correctAnswersCount * 100) / theme.tests.length;

  return (
    <Panel id={id}>
      <PanelHeader>Тесты</PanelHeader>
      <Title title={topic} />
      <MainContainer>
        {theme.tests.length > activeTest ? (
          <>
            <div className="test-header">
              <div className="title">Вопрос: </div>
              <div
                className={clsx("count", {
                  ["count__light"]: appearance === "light",
                  ["count__dark"]: appearance !== "light",
                })}
              >
                {activeTest + 1} / {theme.tests.length}
              </div>
            </div>

            <TestCard
              question={theme.tests[activeTest].question}
              answer={theme.tests[activeTest].answer}
              variant={theme.tests[activeTest].variant}
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
                {correctAnswersCount} / {theme.tests.length}
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
