import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import { useIntervalFPS } from "../Hooks/useInterval";
import useKeyboard from "../Hooks/useKeyboard";
import Controller from "./Controller";
import Lady from "./Lady";
import DeutschBox from "./DeutschBox";
import Dog from "./Hunt/Dog";
import { Block } from "../Level/Block";
import { moveJumpman } from "./JumpmanSlice";
import "./Jumpman.scss";
import { setPlayer } from "../System/PlayerSelectSlice";

export type Jumpman = Block & {
  jumpingSpeed: number;
  climbingSpeed: number;
  walkingSpeed: number;
};

const CODE = "M";
export const Jumpman: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const jumpman = useSelector((state: RootState) => state.jumpman);
  const { current } = useSelector((state: RootState) => state.playerSelect);
  const { gravity } = useSelector((state: RootState) => state.options);

  useIntervalFPS(() => {
    if (jumpman.climbingSpeed || jumpman.jumpingSpeed > 0) return;
    dispatch(
      moveJumpman({
        x: 0,
        y: gravity ? -3 : 0,
      })
    );
  });

  useKeyboard({
    key: CODE,
    onKeyDown: () => dispatch(setPlayer(CODE)),
  });

  return (
    <div
      className={`Player Jumpman Block ${current} ${jumpman.direction}`}
      style={{
        left: jumpman.x,
        bottom: jumpman.y,
      }}
    >
      {current !== "DH" && current !== "D" && <Controller />}
      <DeutschBox />
      <Dog />
      <Lady />
    </div>
  );
};
