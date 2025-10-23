import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../features/categories/categorySlice";

const AddCategoryForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = name.trim();
      if (!trimmed) return;

      const newCategory = {
        id: Date.now(), // simple unique id; replace with nanoid if you prefer
        name: trimmed,
      };

      dispatch(addCategory(newCategory));
      setName("");
    },
    [dispatch, name]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mb-4">
      <label className="block text-sm font-medium mb-1">Add Category</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Work, Personal"
          className="flex-1 p-2 border rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddCategoryForm;
