import PropTypes from "prop-types";
import { useParams } from "@vkontakte/vk-mini-apps-router";
import { Button, Panel, PanelHeader, Tabbar } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import Markdown from "markdown-to-jsx";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

import { useEffect } from "react";
import { Icon24ChevronLeftOutline } from "@vkontakte/icons";
import clsx from "clsx";

import MainContainer from "../Components/MainContainer/MainContainer";
import MyTabbar from "../Components/MyTabbar/MyTabbar";
import "../styles/TheoryTopic.css";
import { useAppearance } from "@vkontakte/vk-bridge-react";
import { BlockedModal } from "../Components/BlockedModal/BlockedModal";

// заглушка
const mockTheoryByTopic = {
  div: {
    title: "div",
    content: `
Что такое \`<div>\`

это прсто контейнер. Такой себе пустой блок, в который ты склдываешь другие элементы.
Нужен, чтобы группировать и оформлять части страницы 
    `,
    example: `
<div>Контент внутри div </div>
    `,
    lang: "html",
  },

  p: {
    title: "p",
    content: `
\`<p>\` - это параграф. Просто кусок текста. Браузер сам добавит отсупы сверху и снизу.
`,
    example: `
<p>Это абзац</p>
    `,
    lang: "html",
  },

  span: {
    title: "span",
    content: `
\`<span>\` - мини обертка для выделения кусочка текста внутри стркои.
`,
    example: `
<p>Это <span>важное</span> слово</p>
    `,
    lang: "html",
  },

  img: {
    title: "img",
    content: `
\`<img />\` - всатавялет картинку по указанному пути.
`,
    example: `
<img scr="кабан.jpg" alt="Веселый кабан"/> 
    `,
    lang: "html",
  },

  h1: {
    title: "h1",
    content: `
\`<h1>\` - главный заголовок, 
\`<h6>\` - самый маленький. Они показывают структуру страницы
`,
    example: `
<h1>Заголовок первого уровня</h1>
<h2>Заголовок второго уровня</h2> 
    `,
    lang: "html",
  },

  a: {
    title: "a",
    content: `
\`<a>\` - делает ссылку. Обязательно укажи href. \n
PS: если хочешь, чтобы ссылка открылась в новой вкладке - добавить \`target="_blank"\` 
`,
    example: `
<a href="https://example.com">Перейти</a>
    `,
    lang: "html",
  },

  header: {
    title: "header",
    content: `
\`header\` - это шапка всей страницы. Обычно в нём логотиип, название, меню
    `,
    example: `
<header>
  <img src="logo.png"/>
  <nav>Навигация</nav>
  <button>Кнопка</button>
</header>
    `,
    lang: "html",
  },

  main: {
    title: "main",
    content: `
\`<main>\` - это то, ради чего пришел ползователь. Здесь весь основной контент. Один на страницу. 
    `,
    example: `
<main>Тут всё самое важное<main/>
    `,
    lang: "html",
  },

  footer: {
    title: "footer",
    content: `
\`<footer>\` - подвал страницы. Там обычно контакты, ссылки, копирайт
    `,
    example: `
<footer© 2025 Все права защищены</footer>
    `,
    lang: "html",
  },

  article: {
    title: "article",
    content: `
\`<article>\` - самостоятельный материал. Это как отедльная история: новость, пост, карточка товаара. \n
Если блок можно читать вне контекста - это <artice>
    `,
    example: `
<article>
    <h2>Новости</h2>
    <p>Сегодня произошло что-то важное...</p>
</article>
    `,
    lang: "html",
  },

  section: {
    title: "section",
    content: `
\`<section>\` - для логических разделов внутри страницы. Тип "О нас", "Отзывы" и т.д. \n
PS: Если хочешь разделить смыслы - section тебя выручит
    `,
    example: `
<section>
  <h2>Отзывы</h2>
  <div>Какие-то отзывы...</div>
</section>
    `,
    lang: "html",
  },

  aside: {
    title: "aside",
    content: `
\`<aside>\` - это дополнительная инфа: сайдбар, советы, ссылки. \n
PS: побочный но полезный контент? Спрячь егов aside
    `,
    example: `
<aside>Полезный совет!</aside>
    `,
    lang: "html",
  },

  position: {
    title: "position",
    content: `
Свойство position делает ла ла ла
    `,
    example: `
.class-root {
    position: absolute
}

.class-chid {
    position: relative
}
    `,
    lang: "css",
  },

  flex: {
    title: "flex",
    content: `
Свойство flex делает ла ла ла
    `,
    example: `
function = () => {
  for (let i; i < 10; i++) {
    let a = i;
  }  
}
    `,
    lang: "javascript",
  },
};

export const TheoryTopic = ({ id }) => {
  const appearance = useAppearance();
  const { topic } = useParams();
  const theory = mockTheoryByTopic[topic];
  const routeNavigator = useRouteNavigator();

  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [theory]);

  if (!theory) {
    return (
      <Panel id={id}>
        <PanelHeader>Ошибка</PanelHeader>
        <MainContainer>
          <BlockedModal />
        </MainContainer>
        <Tabbar>
          <MyTabbar />
        </Tabbar>
      </Panel>
    );
  }

  return (
    <Panel id={id}>
      <PanelHeader>{theory.title}</PanelHeader>

      <div style={{ padding: 16 }}>
        <div
          className={clsx({
            ["btn-back__light"]: appearance === "light",
            ["btn-back__dark"]: appearance !== "light",
          })}
        >
          <Button
            onClick={() => routeNavigator.back()}
            before={<Icon24ChevronLeftOutline />}
            mode="link"
            size="l"
          >
            <span className={clsx("btn")}>Назад</span>
          </Button>
        </div>
        <Markdown
          options={{
            overrides: {
              pre: {
                component: ({ children, ...props }) => (
                  <pre
                    style={{
                      backgroundColor: "#1e1e1e",
                      padding: "12px",
                      borderRadius: "10px",
                      overflowX: "auto",
                      marginTop: "12px",
                    }}
                    {...props}
                  >
                    {children}
                  </pre>
                ),
              },
              code: {
                component: ({ className, children, ...props }) => (
                  <code className={className} {...props}>
                    {children}
                  </code>
                ),
              },
              h4: {
                component: (props) => (
                  <h4
                    style={{
                      fontSize: "20px",
                      marginTop: "24px",
                      fontFamily: "SFProText",
                      fontWeight: "600",
                    }}
                    {...props}
                  />
                ),
              },
              p: {
                component: (props) => (
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: "1.5em",
                      fontFamily: "SFProText",
                      fontWeight: "400",
                    }}
                    {...props}
                  />
                ),
              },
            },
          }}
        >
          {theory.content}
        </Markdown>

        {theory.example && (
          <div style={{ marginTop: 24 }}>
            <h4>🧠 Пример:</h4>
            <pre
              style={{
                backgroundColor: "#24292E",
                color: "#0080FF",
                padding: "12px",
                borderRadius: "8px",
                fontSize: 18,
                overflowX: "auto",
              }}
            >
              <code className={`language-${theory.lang || "html"}`}>
                {theory.example}
              </code>
            </pre>
          </div>
        )}
      </div>
      <Tabbar>
        <MyTabbar />
      </Tabbar>
    </Panel>
  );
};

TheoryTopic.propTypes = {
  id: PropTypes.string.isRequired,
};
