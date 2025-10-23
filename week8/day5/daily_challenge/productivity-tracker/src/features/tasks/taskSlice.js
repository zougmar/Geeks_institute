import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    { id: 1, title: "Learn Redux", categoryId: 1, completed: false },
    { id: 2, title: "Build Tracker App", categoryId: 1, completed: true },
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const { id, title } = action.payload;
      const existingTask = state.tasks.find((t) => t.id === id);
      if (existingTask) existingTask.title = title;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    toggleCompletion: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
  },
});

export const { addTask, editTask, deleteTask, toggleCompletion } = taskSlice.actions;

// Selectors
export const selectAllTasks = (state) => state.tasks.tasks;

export const selectTasksByCategory = createSelector(
  [selectAllTasks, (state, categoryId) => categoryId],
  (tasks, categoryId) => tasks.filter((t) => t.categoryId === categoryId)
);

export const selectCompletedTasks = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter((t) => t.completed).length
);

export default taskSlice.reducer;
