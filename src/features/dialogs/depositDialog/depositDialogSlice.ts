import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OpenParams = {
  poolId: number;
  coinType: string;
  recipientAddress: string;
  decimals: number;
  symbol: string;
  min_deposit: number;
  reserve: number;
};

type State = {
  open: boolean;
  openParams?: OpenParams;
};

const initialState: State = {
  open: false,
};

const slice = createSlice({
  name: 'dialogs/depositDialog',
  initialState,
  reducers: {
    openDepositDialog(state, action: PayloadAction<OpenParams>) {
      state.open = true;
      state.openParams = action.payload;
    },
    closeDepositDialog(state) {
      state.open = false;
      delete state.openParams;
    },
  },
});

export const { openDepositDialog, closeDepositDialog } = slice.actions;
export default slice.reducer;
