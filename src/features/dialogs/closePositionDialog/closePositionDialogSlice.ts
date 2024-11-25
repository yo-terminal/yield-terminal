import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OpenParams = {
  poolId: number;
};

type State = {
  open: boolean;
  openParams?: OpenParams;
};

const initialState: State = {
  open: false,
};

const slice = createSlice({
  name: 'dialogs/closePositionDialog',
  initialState,
  reducers: {
    openClosePositionDialog(state, action: PayloadAction<OpenParams>) {
      state.open = true;
      state.openParams = action.payload;
    },
    closeClosePositionDialog(state) {
      state.open = false;
      delete state.openParams;
    },
  },
});

export const { openClosePositionDialog, closeClosePositionDialog } = slice.actions;
export default slice.reducer;
