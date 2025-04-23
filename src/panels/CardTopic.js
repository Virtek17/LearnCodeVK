// Vk импорты
import { useParams } from "@vkontakte/vk-mini-apps-router";
import { Button, Panel, PanelHeader, Tabbar } from "@vkontakte/vkui";
import {
  Icon24ThumbsUpOutline,
  Icon24ThumbsDownOutline,
} from "@vkontakte/icons";
import PropTypes from "prop-types";
// import { Appearance, useAppearance } from '@vkontakte/vk-bridge';

// ИМПОРТЫ КАСТОМНЫХ КОМПОНЕНТОВ
import { Card } from "../Components/Card/Card";
import { useState } from "react";
import MyTabbar from "../Components/MyTabbar/MyTabbar";

// ИМПОРТЫ СТИЛЕЙ
import "../styles/cardTopic.css";
export const CardTopic = ({ id }) => {
  const [activeCard, setActiveCard] = useState(0); // активная карточка
  const [flipped, setFlipped] = useState(false); // Переворот карточки
  const [checked, setChecked] = useState(false); // Кнопка "Проверить"
  const [mark, setMark] = useState(false); // Отображение кнопок оценки
  const [marked, setMarked] = useState(false); // Оценен ли вопрос
  const [fail, setFail] = useState(false); // не ответил на вопрос
  const [success, setSuccess] = useState(false); // ответил на вопрос

  const { topic } = useParams(); // Получаем тему из URL
  // const appearance = useAppearance(); // Для управления цветовой темой

  const cardsForTopic = [
    {
      title: "html",
      cards: [
        {
          question: "Что такое HTML?",
          answer: "HTML — это язык разметки страниц.",
        },
        {
          question: "В какой тэг оборачивать шапку страницы?",
          answer: "<header>",
        },
        {
          question: "Для чего используется тэг <br>?",
          answer: "<br> используется для переноса строки",
        },
        {
          question: "Где прописывается подключение стилей?",
          answer: "В тэге <head>",
        },
        {
          question: "Что случится если написать <header> внутри <footer>",
          answer: "Ничего не случится, но это семмантически не верно",
        },
      ],
    },
    {
      title: "css",
      cards: [
        {
          question: "Что такое CSS?",
          answer: "CSS — это язык стилей для оформления страниц.",
        },
        {
          question: "Каким свойством задается цвет текста?",
          answer: "color",
        },
        {
          question: "Как выровнять блок по центру?",
          answer: `Родительскому элементу задать следующие свойства: 
          display: flex;
          justify-content: space-between;
          align-items: center;`,
        },
      ],
    },
    {
      title: "JavaScript",
      cards: [
        {
          question: "Что такое JS?",
          answer: "JS — это язык программирования для веба.",
        },
        {
          question: "В чем отличие const от let?",
          answer: "const нельзя изменить, а let можно",
        },
        {
          question: "Как сделать бесконечный цикл?",
          answer: "white(true)",
        },
        {
          question: "Как подключить JavaScript файл к старанице?",
          answer: "В <head> написать <script src='путь до файла'><srcipt/>",
        },
      ],
    },
  ];

  const card = cardsForTopic.find((item) => item.title === topic); // Ищем карточку по topic

  if (!card) {
    return <div>Тема не найдена</div>;
  }

  const checkOrNextAnswer = () => {
    if (checked && marked) {
      nextQuestion();
    } else {
      setMark(true);
      setFlipped(true);
      setChecked(true);
    }
  };

  const canFlipCard = () => {
    if (checked) setFlipped(!flipped);
  };

  const markAnswer = () => {
    setMarked(true);
  };

  const nextQuestion = () => {
    setActiveCard(activeCard + 1);
    setFlipped(false);
    setMark(false);
    setMarked(false);
    setChecked(false);
    setSuccess(false);
    setFail(false);
  };

  const successBtn = () => {
    setSuccess(true);
    setFail(false);
    markAnswer();
  };

  const failBtn = () => {
    setFail(true);
    setSuccess(false);
    markAnswer();
  };

  return (
    <Panel
      id={id}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <PanelHeader>Карточки по теме {topic}</PanelHeader>

      <div className="row">
        {card.cards.length > activeCard ? (
          <Card
            card={card}
            currentQuestion={activeCard}
            question={card.cards[activeCard].question}
            answer={card.cards[activeCard].answer}
            flipped={flipped}
            style={{ flex: "1" }}
            onClick={canFlipCard}
          />
        ) : (
          <div>карточки кончились</div>
        )}

        {mark && (
          <>
            <div className="buttons-title">Как вопрос, норм или треш?</div>
            <div className="buttons-wrapper">
              <Button
                size="l"
                mode="outline"
                before={<Icon24ThumbsDownOutline />}
                activated={fail}
                activeMode={"btnActive"}
                hoverClassName={"btnHover"}
                onClick={() => failBtn()}
              >
                Чет не вывез
              </Button>

              <Button
                size="l"
                mode="outline"
                activated={success}
                activeMode={"btnActive"}
                activeEffectDelay="5"
                hoverClassName={"btnHover"}
                before={<Icon24ThumbsUpOutline />}
                onClick={() => successBtn()}
              >
                Го сложнее
              </Button>
            </div>
          </>
        )}

        <div className="check-button">
          <Button
            style={{
              flex: "2",
            }}
            size="l"
            stretched={true}
            disabled={mark && !marked}
            onClick={checkOrNextAnswer}
          >
            {checked ? "Далее" : "Проверить"}
          </Button>
        </div>
      </div>

      <Tabbar>
        <MyTabbar />
      </Tabbar>
    </Panel>
  );
};

CardTopic.propTypes = {
  id: PropTypes.string.isRequired,
};
