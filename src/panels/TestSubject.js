import { Panel, Tabbar, PanelHeader, Button } from "@vkontakte/vkui";
import PropTypes from "prop-types";
import MyTabbar from "../Components/MyTabbar/MyTabbar";
import Title from "../Components/Title/Title";
import MainContainer from "../Components/MainContainer/MainContainer";
import SimpleTile from "../Components/SimpleTile/SimpleTile";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Icon24ChevronLeftOutline } from "@vkontakte/icons";
import clsx from "clsx";
import { useTestSubject } from "../hooks/useTestSubject";
import { MiniSkeleton } from "../Components/Skeletons/MiniSkeleton/MiniSkeleton";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
import { useGetUserProgress } from "../hooks/useGetUserProgress";
import { useGetUserId } from "../hooks/useGetUserId";

export const TestSubject = ({ id }) => {
  const { userId } = useGetUserId();
  const { direction, subject } = useParams(); // Получаем тему из URL
  const routeNavigator = useRouteNavigator();
  console.log(userId);
  const { tests } = useGetUserProgress(userId);
  console.log(tests);
  const [filteredTests, setFilteredTests] = useState([]);

  const { testSubject, isLoading, error } = useTestSubject(subject);
  // console.log("tests: ", tests);
  // console.log("testSubject: ", testSubject);

  useEffect(() => {
    if (!tests || !testSubject || !Array.isArray(testSubject.test_subject))
      return;

    // Получаем набор нужных текстов из testSubject.test_subject
    const allowedTexts = new Set(
      testSubject.test_subject.map((item) => item.text)
    );

    // Фильтруем исходный массив
    const filteredTests = tests.filter((test) => allowedTexts.has(test.text));

    console.log("Отфильтрованные тесты:", filteredTests);
    setFilteredTests(filteredTests);
  }, [tests, testSubject]);

  if (isLoading) {
    return (
      <>
        <PanelHeader>Тесты</PanelHeader>
        <MiniSkeleton />
      </>
    );
  }

  if (error) {
    console.log(error);
  }

  return (
    <Panel id={id}>
      <PanelHeader>Тесты</PanelHeader>
      <Title title={`Тесты по ${subject}`} />
      <MainContainer>
        <Button
          onClick={() => routeNavigator.back()}
          before={<Icon24ChevronLeftOutline />}
          mode="link"
          size="l"
        >
          <span className={clsx("btn")}>Назад</span>
        </Button>

        {filteredTests.map((test) => {
          const { text, user_test_progress } = test;
          const progress = user_test_progress[0]; // Первый элемент массива user_test_progress

          return (
            <SimpleTile
              key={text}
              title={text}
              block={!progress.is_passed} // Используем is_passed как блокировку
              onClick={() => {
                if (progress.is_passed) {
                  routeNavigator.push(`/tests/${direction}/${subject}/${text}`);
                }
              }}
            />
          );
        })}

        {!testSubject?.test_subject?.length && !isLoading && (
          <div>Нет доступных тестов по этой теме</div>
        )}
      </MainContainer>
      <Tabbar>
        <MyTabbar />
      </Tabbar>
    </Panel>
  );
};

TestSubject.propTypes = {
  id: PropTypes.string.isRequired,
};
