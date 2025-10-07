import React from 'react';
import Header from './components/Header';
import Card from './components/Card';
import Contact from './components/Contact';

function App() {
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;

  return (
    <div>
      <Header />
      <div className="container my-5">
        <Card icon="fa-building" title="About the Company" text={text} />
        <Card icon="fa-globe" title="Our Values" text={text} />
        <Card icon="fa-university" title="Our Mission" text={text} />
      </div>
      <Contact />
    </div>
  );
}

export default App;
