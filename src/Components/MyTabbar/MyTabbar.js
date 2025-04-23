import {
  Icon28HomeOutline,
  Icon28PenStackOutline,
  Icon28Cards2Outline,
  Icon28BookSpreadOutline,
} from "@vkontakte/icons";

import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { TabbarItem } from "@vkontakte/vkui";

// import styles from "./MyTabbar.module.css";
import { useLocation } from "@vkontakte/vk-mini-apps-router/dist/hooks/hooks";

const MyTabbar = () => {
  const location = useLocation();
  const routeNavigator = useRouteNavigator();

  return (
    <>
      <TabbarItem
        selected={location.pathname === "/"}
        onClick={() => routeNavigator.go("/")}
        label="Главная"
      >
        <Icon28HomeOutline fill="currentColor" />
      </TabbarItem>

      <TabbarItem
        selected={location.pathname === "/tests"}
        onClick={() => routeNavigator.go("/tests")}
        label="Тесты"
      >
        <Icon28PenStackOutline fill="currentColor" />
      </TabbarItem>

      <TabbarItem
        selected={location.pathname.startsWith("/cards")}
        onClick={() => routeNavigator.go("/cards")}
        label="Карточки"
      >
        <Icon28Cards2Outline fill="currentColor" />
      </TabbarItem>

      <TabbarItem
        selected={location.pathname === "/theory"}
        onClick={() => routeNavigator.go("/theory")}
        label="Теория"
      >
        <Icon28BookSpreadOutline fill="currentColor" />
      </TabbarItem>
    </>
  );
};

// const MyTabbar = () => {
//   const [indicator, setIndicator] = useState("one");
//   const routeNavigator = useRouteNavigator();

//   return (
//     <>
//       <TabbarItem
//         label="Гланая"
//         selected={indicator == "one"}
//         className={styles.root}
//         onClick={() => routeNavigator.go("/")}
//       >
//         <Icon28HomeOutline fill="#2688eb" />
//       </TabbarItem>

//       <TabbarItem
//         label="Тесты"
//         selected={indicator == "/two"}
//         className={styles.root}
//         onClick={() => routeNavigator.go("/tests")}
//       >
//         <Icon28PenStackOutline fill="#2688eb" />
//       </TabbarItem>

//       <TabbarItem
//         label="Карточки"
//         selected={indicator == "/three"}
//         className={styles.root}
//         onClick={() => routeNavigator.go("/cards")}
//       >
//         <Icon28Cards2Outline fill="#2688eb" />
//       </TabbarItem>

//       <TabbarItem
//         label="Теория"
//         selected={indicator == "/four"}
//         className={styles.root}
//         onClick={() => routeNavigator.go("/theory")}
//       >
//         <Icon28BookSpreadOutline fill="#2688eb" />
//       </TabbarItem>
//     </>
//   );
// };

export default MyTabbar;
