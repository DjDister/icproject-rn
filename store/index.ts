import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { saveProjectsMiddleware } from "./middlewares/projects.middleware";
import projectsReducer from "./slices/projectsSlice";

const rootReducer = combineReducers({
  projects: projectsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveProjectsMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
