import { Middleware, isAnyOf } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../index";
import {
  addProject,
  addTask,
  deleteProject,
  deleteTask,
  reorderTasks,
  saveProjects,
  toggleTaskCompletion,
} from "../slices/projectsSlice";

const actionsToSave = [
  addProject,
  deleteProject,
  addTask,
  deleteTask,
  toggleTaskCompletion,
  reorderTasks,
];

export const saveProjectsMiddleware: Middleware =
  (storeApi) => (next) => (action) => {
    const dispatch = storeApi.dispatch as AppDispatch;

    const result = next(action);

    if (isAnyOf(...actionsToSave)(action)) {
      const state = storeApi.getState() as RootState;
      dispatch(saveProjects(state.projects.items));
    }

    return result;
  };
