import AgeDisplay from "./components/AgeDisplay";
import AgeControls from "./components/AgeControls";

function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">Age Tracker</h1>
      <AgeDisplay />
      <AgeControls />
    </div>
  );
}

export default App;
  