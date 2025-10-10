import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from "./components/ErrorBoundary";

// Functional components
const HomeScreen = () => <h1 className="text-center mt-5">🏠 Home Page</h1>;

const ProfileScreen = () => (
  <h1 className="text-center mt-5">👤 Profile Page</h1>
);

const ShopScreen = () => {
  // Simulate an error
  throw new Error("Shop crashed!");
};

// Main App
const App = () => {
  return (
    <BrowserRouter>
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            MyApp
          </NavLink>
          <div>
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/shop">
                  Shop
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <HomeScreen />
              </ErrorBoundary>
            }
          />
          <Route
            path="/profile"
            element={
              <ErrorBoundary>
                <ProfileScreen />
              </ErrorBoundary>
            }
          />
          <Route
            path="/shop"
            element={
              <ErrorBoundary>
                <ShopScreen />
              </ErrorBoundary>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
