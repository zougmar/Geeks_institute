import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  tasksByDate: {},
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        const { date, task } = action.payload;
        if (!state.tasksByDate[date]) state.tasksByDate[date] = [];
        state.tasksByDate[date].push(task);
      },
      prepare({ date, text }) {
        return {
          payload: {
            date,
            task: { id: nanoid(), text, completed: false },
          },
        };
      },
    },
    editTask(state, action) {
      const { date, id, updates } = action.payload;
      const list = state.tasksByDate[date];
      if (!list) return;
      const idx = list.findIndex((t) => t.id === id);
      if (idx !== -1) {
        state.tasksByDate[date][idx] = {
          ...state.tasksByDate[date][idx],
          ...updates,
        };
      }
    },
    deleteTask(state, action) {
      const { date, id } = action.payload;
      const list = state.tasksByDate[date];
      if (!list) return;
      state.tasksByDate[date] = list.filter((t) => t.id !== id);
    },
    toggleTask(state, action) {
      const { date, id } = action.payload;
      const list = state.tasksByDate[date];
      if (!list) return;
      const t = list.find((x) => x.id === id);
      if (t) t.completed = !t.completed;
    },
  },
});

export const { addTask, editTask, deleteTask, toggleTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
