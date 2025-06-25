import { PROJECTS_STORAGE_KEY } from "@/consts/projects.consts";
import { Project, Task } from "@/types/projects.types";
import { getItem, setItem } from "@/utils/storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as Crypto from "expo-crypto";

interface ProjectsState {
  items: Project[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  items: [],
  isLoading: true,
  error: null,
};

export const loadProjects = createAsyncThunk(
  "projects/load",
  async (_, { rejectWithValue }) => {
    try {
      const storedProjects = await getItem(PROJECTS_STORAGE_KEY);
      if (storedProjects) {
        return JSON.parse(storedProjects) as Project[];
      }
      return [] as Project[];
    } catch (error) {
      console.error("Failed to load projects:", error);
      return rejectWithValue("Failed to load projects");
    }
  }
);

export const saveProjects = createAsyncThunk(
  "projects/save",
  async (projects: Project[], { rejectWithValue }) => {
    try {
      await setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
      return projects;
    } catch (error) {
      console.error("Failed to save projects:", error);
      return rejectWithValue("Failed to save projects");
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<string>) => {
      const newProject: Project = {
        id: Crypto.randomUUID(),
        name: action.payload,
        tasks: [],
      };
      state.items.push(newProject);
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (project) => project.id !== action.payload
      );
    },
    addTask: (
      state,
      action: PayloadAction<{ projectId: string; title: string }>
    ) => {
      const { projectId, title } = action.payload;
      const project = state.items.find((p) => p.id === projectId);

      if (project) {
        const newTask: Task = {
          id: Crypto.randomUUID(),
          title,
          completed: false,
          position: project.tasks.length,
        };
        project.tasks.push(newTask);
      }
    },
    deleteTask: (
      state,
      action: PayloadAction<{ projectId: string; taskId: string }>
    ) => {
      const { projectId, taskId } = action.payload;
      const project = state.items.find((p) => p.id === projectId);

      if (project) {
        project.tasks = project.tasks.filter((task) => task.id !== taskId);
      }
    },
    toggleTaskCompletion: (
      state,
      action: PayloadAction<{ projectId: string; taskId: string }>
    ) => {
      const { projectId, taskId } = action.payload;
      const project = state.items.find((p) => p.id === projectId);

      if (project) {
        const task = project.tasks.find((t) => t.id === taskId);
        if (task) {
          task.completed = !task.completed;
        }
      }
    },
    reorderTasks: (
      state,
      action: PayloadAction<{ projectId: string; reorderedTasks: Task[] }>
    ) => {
      const { projectId, reorderedTasks } = action.payload;
      const project = state.items.find((p) => p.id === projectId);

      if (project) {
        project.tasks = reorderedTasks;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadProjects.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loadProjects.rejected, (state, action) => {
        console.log("rejected");
        console.log("aciton.payload", action.payload);
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(saveProjects.fulfilled, (state, action) => {
        state.items = action.payload;
        state.error = null;
      })
      .addCase(saveProjects.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {
  addProject,
  deleteProject,
  addTask,
  deleteTask,
  toggleTaskCompletion,
  reorderTasks,
} = projectsSlice.actions;

export default projectsSlice.reducer;
