
import './App.css';

function App() {
  const myelement = <h1>I Love JSX!</h1>;
  const sum = 5 + 5;
  return (
    <div className="App">
      <p>HELLO WORLD!</p>
      {myelement}
      <p>React is {sum} times better with JSX</p>
    </div>
  );
}

export default App;
