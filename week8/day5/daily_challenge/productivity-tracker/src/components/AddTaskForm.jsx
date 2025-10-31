import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";
import { selectAllCategories } from "../features/categories/categorySlice";

const AddTaskForm = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState(
    categories.length ? categories[0].id : ""
  );

  // keep categoryId in sync if categories change (simple guard)
  React.useEffect(() => {
    if (!categoryId && categories.length) {
      setCategoryId(categories[0].id);
    }
  }, [categories, categoryId]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = title.trim();
      if (!trimmed) return;

      const newTask = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        title: trimmed,
        categoryId: categoryId || null,
        completed: false,
      };

      dispatch(addTask(newTask));
      setTitle("");
    },
    [dispatch, title, categoryId]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mb-4">
      <label className="block text-sm font-medium mb-1">Add Task</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="flex-1 p-2 border rounded-md"
        />

        <select
          value={categoryId ?? ""}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="p-2 border rounded-md"
        >
          <option value="">No category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;

