import React from "react";
import PostList from "./PostList";
import UsersList from "./UsersList";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-blue-600 text-white py-6 shadow-md text-center">
        <h1 className="text-4xl font-bold">API Data Fetching Example</h1>
      </header>
      <main>
        <PostList />
        <UsersList />
      </main>
    </div>
  );
}

export default App;
