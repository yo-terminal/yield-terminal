import { configureStore } from "@reduxjs/toolkit";
import app from "./appSlice";
import dialogs from "../features/dialogs/dialogsSlice";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    app,
    dialogs,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
