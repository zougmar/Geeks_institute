import React, { useContext } from "react";
import { ThemeProvider, ThemeContext } from "./ThemeContext";
import ThemeSwitcher from "./ThemeSwitcher";

function AppContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center 
                  transition-colors duration-300
                  ${theme === "light" ? "bg-white text-gray-800" : "bg-gray-900 text-white"}`}
    >
      <h1 className="text-4xl mb-6">Theme Switcher Example</h1>
      <ThemeSwitcher />
      <p className="mt-4 text-lg">
        The current theme is <strong>{theme}</strong>.
      </p>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
