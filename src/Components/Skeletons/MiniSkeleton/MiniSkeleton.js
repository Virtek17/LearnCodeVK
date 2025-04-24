import style from "./MiniSkeleton.module.css";
import MainContainer from "../../MainContainer/MainContainer";
import { Skeleton } from "@vkontakte/vkui";
import { useAppearance } from "@vkontakte/vk-bridge-react";
import "../../../styles/variables.css";

export const MiniSkeleton = () => {
  const appearance = useAppearance();
  // let colorLightStart = "#EAE9E9";
  // let colorLightEnd = "#EAE9FF";

  // let colorDarkStart = "#212031";
  // let colorDarkEnd = "#3B3A4D";

  const skeletons = Array.from({ length: 6 }, (_, index) => (
    <Skeleton
      key={index}
      width="100%"
      height={80}
      borderRadius={10}
      colorFrom={`var(--color-${appearance}-skeleton-start)`}
      colorTo={`var(--color-${appearance}-skeleton-end)`}
      style={{ marginBottom: "12px" }}
    />
  ));

  return (
    <div className={style.wrapper}>
      <MainContainer>
        <Skeleton
          width="70%"
          height={24}
          colorFrom={`var(--color-${appearance}-skeleton-start)`}
          colorTo={`var(--color-${appearance}-skeleton-end)`}
          style={{ marginBottom: "30px" }}
        />
        {skeletons}
      </MainContainer>
    </div>
  );
};
