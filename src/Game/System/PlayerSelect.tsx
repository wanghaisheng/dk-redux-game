import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../reduxStore";
import useKeyboard from "../Hooks/useKeyboard";
import { then } from "./Options";
import { setPlayer, winPlayer } from "./PlayerSelectSlice";
import "./PlayerSelect.scss";

const MAX_PLAYERS = 5;

export type Player = {
  code: string;
  complete?: boolean;
  speedRun?: number;
  highScore?: number;
};

export type PlayerSelect = {
  players: Record<string, Player>;
  current: string;
};

const PlayerSelect: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { players, current } = useSelector(
    (state: RootState) => state.playerSelect
  );
  const dispatchSetPlayer = (p: string) => dispatch(setPlayer(p));
  const dispatchWinPlayer = () => dispatch(winPlayer());

  useKeyboard({
    key: "0",
    onKeyDown: dispatchWinPlayer,
  });
  useKeyboard({
    key: then.slice(-4),
    onKeyDown: () => dispatchSetPlayer("​"),
  });

  const unlocked = Object.values(players);
  const complete = unlocked.filter((player) => player.complete).length;

  const missing = MAX_PLAYERS - unlocked.length;
  const message = `${missing} PLAYER${missing > 1 ? "S" : ""}`;

  const rate =
    missing === 0
      ? ((unlocked.length + complete) * 100) / (MAX_PLAYERS * 2)
      : (unlocked.length * 100) / MAX_PLAYERS;

  return (
    <div className="PlayerSelect">
      <u>PLAYER SELECT</u>
      <div className="Completion LargerBoldItalic">{rate.toFixed(0)}%</div>
      <div className="Players">
        {unlocked.map(({ code, complete, highScore, speedRun }) => {
          const isActive = code === current ? "Active" : "";
          return (
            <div
              key={code}
              className={`Select ${isActive}`}
              onClick={() => dispatchSetPlayer(code)}
            >
              <div className={`Jumpman Block right ${code}`}>
                {/** TODO generalize optional decoration (eyes, dress) */}
                {code == "DH" ? "oo" : ""}
              </div>
              {complete && (
                <div className="Records">
                  {isActive ? (
                    <div className={isActive}>
                      <span className="emoji">🏆</span>
                      {highScore} <br />
                      <span className="emoji">⏱</span>
                      {speedRun}s
                    </div>
                  ) : (
                    <span className="emoji">⭐</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="Message">
        {missing > 0 ? (
          <>MISSING: {message}</>
        ) : (
          <span className="LargerBoldItalic">
            {rate < 100 ? (
              <>EVERYBODY IS HERE! </>
            ) : (
              <>
                YOU ARE A SUPER PLAYER!
                <span className="emoji">⭐⭐⭐⭐⭐</span>
              </>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default PlayerSelect;
