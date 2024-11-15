import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  archive: boolean;
  decrypted: boolean;
};

const initialState: State = {
  archive: false,
  decrypted: false,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setArchive(state, action: PayloadAction<boolean>) {
      state.archive = action.payload;
    },
    setDecrypted(state, action: PayloadAction<boolean>) {
      state.decrypted = action.payload;
    },
  },
});

export const { setArchive, setDecrypted } = slice.actions;
export default slice.reducer;
