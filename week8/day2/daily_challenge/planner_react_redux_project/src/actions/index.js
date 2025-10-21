export const setSelectedDay = (day) => ({
  type: "SET_SELECTED_DAY",
  payload: day,
});

export const addTask = (day, task) => ({
  type: "ADD_TASK",
  payload: { day, task },
});

export const editTask = (day, id, updatedTask) => ({
  type: "EDIT_TASK",
  payload: { day, id, updatedTask },
});

export const deleteTask = (day, id) => ({
  type: "DELETE_TASK",
  payload: { day, id },
});
