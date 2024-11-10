import React from 'react';
import './App.css';

const App: React.FC = () => {
  const title = 'My React App';

  return (
    <div>
      <h1>{title}</h1>
      <p>Welcome to my React application!</p>
    </div>
  );
};

export default App;