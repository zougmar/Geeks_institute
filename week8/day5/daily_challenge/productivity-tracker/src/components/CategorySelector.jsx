import React from "react";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../features/categories/categorySlice";

const CategorySelector = ({ selectedCategory, onSelect }) => {
  const categories = useSelector(selectAllCategories);

  return (
    <select
      className="border rounded-md p-2"
      value={selectedCategory}
      onChange={(e) => onSelect(Number(e.target.value))}
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
};

export default CategorySelector;
