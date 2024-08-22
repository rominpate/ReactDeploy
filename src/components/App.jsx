import { useState, useRef } from 'react';

// Imported  styles
import '../styles/App.css';

// Imported  component
import Connect from './Connect';  


function App() {

  return (
    <div>
      <h1>WebSocket Test Client</h1>
      <Connect />
    </div>
  );
}

export default App;
