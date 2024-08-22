import { useState, useRef } from 'react';
import '../styles/App.css';
import Connect from './Connect';  // Import the Connect component


function App() {

  return (
    <div>
      <h1>WebSocket Test Client</h1>
      <Connect />
    </div>
  );
}

export default App;
