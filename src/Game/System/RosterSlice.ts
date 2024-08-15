import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Player, Roster } from "./Roster";
import { RootState, StoreDispatch } from "../reduxStore";
import { showMessage } from "./StatusSlice";

const initialState: Roster = {
  current: "M",
  players: {},
};

const slice = createSlice({
  name: "RosterSlice",
  initialState,
  reducers: {
    unlockPlayer(state, action: PayloadAction<Player>) {
      state.players[action.payload.code] = action.payload;
    },
    setCurrent(state, action: PayloadAction<string>) {
      state.current = action.payload;
    },
    winPlayer: (state) => {
      const { current, players } = state;
      const update: Player = {
        ...players[current],
        complete: true,
        highScore: Math.floor(10000 + Math.random() * 90000),
        speedRun: Math.floor(100 + Math.random() * 900),
      };
      state.players[current] = update;
    },
  },
});

export const setPlayer = createAsyncThunk<
  void,
  string,
  {
    state: RootState;
    dispatch: StoreDispatch;
  }
>("RosterSlice/setPlayer", async (payload: string, { getState, dispatch }) => {
  const { roster }: RootState = getState();
  const code = payload.toString();

  if (!roster.players[code]) {
    dispatch(showMessage("PLAYER UNLOCKED: " + code));
    dispatch(slice.actions.unlockPlayer({ code }));
  }
  dispatch(slice.actions.setCurrent(code));
});

export const { winPlayer } = slice.actions;
export default slice.reducer;