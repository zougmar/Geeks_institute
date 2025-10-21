const initialState = {
  selectedDay: new Date().toISOString().slice(0, 10),
  tasksByDay: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_SELECTED_DAY":
      return { ...state, selectedDay: action.payload };

    case "ADD_TASK":
      return {
        ...state,
        tasksByDay: {
          ...state.tasksByDay,
          [action.payload.day]: [
            ...(state.tasksByDay[action.payload.day] || []),
            action.payload.task,
          ],
        },
      };

    case "EDIT_TASK":
      return {
        ...state,
        tasksByDay: {
          ...state.tasksByDay,
          [action.payload.day]: state.tasksByDay[action.payload.day].map((t) =>
            t.id === action.payload.id
              ? { ...t, ...action.payload.updatedTask }
              : t
          ),
        },
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasksByDay: {
          ...state.tasksByDay,
          [action.payload.day]: state.tasksByDay[action.payload.day].filter(
            (t) => t.id !== action.payload.id
          ),
        },
      };

    default:
      return state;
  }
}
