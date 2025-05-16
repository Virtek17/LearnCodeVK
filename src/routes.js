import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from "@vkontakte/vk-mini-apps-router";

// Идентификаторы корня и вьюшки
export const DEFAULT_ROOT = "default_root";
export const DEFAULT_VIEW = "default_view";

// Все панели в рамках приложения
export const DEFAULT_VIEW_PANELS = {
  HOME: "home",
  PERSIK: "persik",
  CARDS: "cards",
  CARD_TOPIC: "cardTopic",
  THEORY: "theory",
  THEORY_THEME: "theoryTheme",
  THEORY_TOPIC: "theoryTopic",
  TESTS: "tests",
  TEST_DIRECTION: "testDirection",
  TEST_SUBJECT: "testSubject",
  TEST_TOPIC: "testTopic",
  RATING: "rating", // 👈 добавили новую панель рейтинга
};

// Конфигурация маршрутов
export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, "/", []),
      createPanel(
        DEFAULT_VIEW_PANELS.PERSIK,
        `/${DEFAULT_VIEW_PANELS.PERSIK}`,
        []
      ),
      // =============== CARDS ===============
      createPanel(
        DEFAULT_VIEW_PANELS.CARDS,
        `/${DEFAULT_VIEW_PANELS.CARDS}`,
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.CARD_TOPIC,
        `/${DEFAULT_VIEW_PANELS.CARD_TOPIC}/:topic`,
        []
      ),
      // =============== THEORY ===============
      createPanel(
        DEFAULT_VIEW_PANELS.THEORY,
        `/${DEFAULT_VIEW_PANELS.THEORY}`,
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.THEORY_THEME,
        "/theory/:theory_theme",
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.THEORY_TOPIC,
        "/theory/:theory_theme/:topic",
        []
      ),
      // =============== TESTS ===============
      createPanel(DEFAULT_VIEW_PANELS.TESTS, "/tests", []),
      createPanel(DEFAULT_VIEW_PANELS.TEST_DIRECTION, "/tests/:direction", []),
      createPanel(
        DEFAULT_VIEW_PANELS.TEST_SUBJECT,
        "/tests/:direction/:subject",
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.TEST_TOPIC,
        "/tests/:direction/:subject/:topic",
        []
      ),
      // =============== RATING ===============
      createPanel(DEFAULT_VIEW_PANELS.RATING, "/rating", []), // 👈 Новый маршрут
    ]),
  ]),
]);

// Инициализация маршрутизатора
export const router = createHashRouter(routes.getRoutes());