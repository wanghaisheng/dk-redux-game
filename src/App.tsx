import { name, repository, donate } from "../package.json";
import GitHub from "/GitHub.svg?url";
import Game from "./Game";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <b>DK Redux</b>
      <div className="Content">
        <div className="Manual">
          <u>HOW TO PLAY</u>
          <div>
            <p>
              &nbsp;Walk: ARROW KEYS <br />
              &nbsp;Jump: SPACE
            </p>
            <p>
              Pause: ENTER <br />
              Reset: F5 <br />
              &nbsp;Zoom: F11 <br />
              &nbsp;////: //
              <span className="Gravity Hint">
                x.80665... m/s <sup>2</sup>
              </span>
              <br />
              &nbsp;Mode: F8
            </p>
            &nbsp;Code: F12
            <span className="Code Hint">
              {"<HTML/>  CSS{.dk}?"}
              <div className="dk" />
            </span>
          </div>
        </div>
        <Game />
        <div className="Manual">
          <u>PLAYER SELECT</u>
          <div>
            <p>
              M: Jumpman
              <br />
              D:
              <a href="https://fer-nando-machado.github.io/react-deutschbox/">
                {"<DeutschBox/>"}
              </a>
              <br />
              +: Duck Hunt<span className="Player Hint">Touch!</span>
            </p>
            ?: #____<span className="Player Hint">DK is real...?!</span>
          </div>
        </div>
      </div>
      <div className="Footer">
        <a href={repository.link}>
          <img
            src={GitHub}
            alt={`${name} @ GitHub`}
            title={`${name} @ GitHub`}
            height={24}
          />
        </a>
        <a href={donate} className="Donate">
          Donate
        </a>
      </div>
    </div>
  );
};

export default App;
