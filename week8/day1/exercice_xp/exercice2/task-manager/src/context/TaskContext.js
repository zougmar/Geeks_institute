// src/context/TaskContext.js
import React, { createContext, useReducer, useEffect } from "react";

export const TaskContext = createContext();

export const ACTIONS = {
  ADD_TASK: "add-task",
  TOGGLE_TASK: "toggle-task",
  REMOVE_TASK: "remove-task",
  EDIT_TASK: "edit-task",
  SET_TASKS: "set-tasks",
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_TASKS:
      return action.payload.tasks;
    case ACTIONS.ADD_TASK:
      return [
        ...state,
        { id: Date.now(), text: action.payload.text, completed: false },
      ];
    case ACTIONS.TOGGLE_TASK:
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed }
          : task
      );
    case ACTIONS.REMOVE_TASK:
      return state.filter((task) => task.id !== action.payload.id);
    case ACTIONS.EDIT_TASK:
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, text: action.payload.text }
          : task
      );
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    dispatch({ type: ACTIONS.SET_TASKS, payload: { tasks: storedTasks } });
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
