import { configureStore } from "@reduxjs/toolkit";
import app from "./appSlice";
import root from "../features/root/rootSlice";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    app,
    root,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
