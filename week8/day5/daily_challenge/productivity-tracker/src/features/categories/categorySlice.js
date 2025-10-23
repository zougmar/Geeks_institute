import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    { id: 1, name: "Work" },
    { id: 2, name: "Personal" },
  ],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    editCategory: (state, action) => {
      const { id, name } = action.payload;
      const category = state.categories.find((c) => c.id === id);
      if (category) category.name = name;
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter((c) => c.id !== action.payload);
    },
  },
});

export const { addCategory, editCategory, deleteCategory } = categorySlice.actions;

export const selectAllCategories = (state) => state.categories.categories;

export const selectCategoryById = createSelector(
  [selectAllCategories, (state, id) => id],
  (categories, id) => categories.find((c) => c.id === id)
);

export default categorySlice.reducer;
