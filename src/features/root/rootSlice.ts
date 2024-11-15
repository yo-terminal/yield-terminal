import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  searchQuery: string;
};

const initialState: State = {
  searchQuery: "",
};

const slice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = slice.actions;
export default slice.reducer;
