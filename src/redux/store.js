import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./project";
import logReducer from "./log";
import themeReducer from "./theme";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    log: logReducer,
    theme: themeReducer,
  },
});
