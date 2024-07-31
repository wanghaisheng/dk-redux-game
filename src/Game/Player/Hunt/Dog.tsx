import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../../reduxStore";
import { setPlayer } from "../../System/OptionsSlice";
import useKeyboard from "../../Hooks/useKeyboard";
import "./Dog.scss";

const CODE = "DH";
const Dog: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { player } = useSelector((state: RootState) => state.options);

  useKeyboard({
    key: CODE,
    onKeyDown: () => dispatch(setPlayer(CODE)),
  });

  return player.code === CODE ? <span>oo</span> : <></>;
};

export const isDuckHunting = () => {
  const { player } = useSelector((state: RootState) => state.options);
  return player.code === CODE;
};

export const hasUnlockedDuckHunting = () => {
  const { playerSelect } = useSelector((state: RootState) => state.options);
  return Boolean(playerSelect[CODE]);
};

export default Dog;