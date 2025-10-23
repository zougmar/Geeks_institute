import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import CategorySelector from "./components/CategorySelector";
import TaskList from "./components/TaskList";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
        <h1 className="text-2xl font-bold mb-4">🧠 Productivity Tracker</h1>
        <CategorySelector
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <TaskList categoryId={selectedCategory} />
      </div>
    </Provider>
  );
};

export default App;
