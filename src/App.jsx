import { useState, useRef } from 'react';
import Button from './Button'; // Import the Button component
import './App.css';

function App() {
  const [log, setLog] = useState("");
  const ws = useRef(null);

  const connect = () => {
    if (ws.current) {
      ws.current.close();
      return;
    }

    const url = 'ws://169.254.186.231:80/websocket';
    ws.current = new WebSocket(url);
    console.log(url);

    ws.current.onopen = function() {
      setLog((prevLog) => 'CONNECTION OPENED<br/><hr>' + prevLog);
    };

    ws.current.onmessage = function(ev) {
      setLog((prevLog) => `<hr>RECEIVED: ${ev.data}<br/>` + prevLog);
    };

    ws.current.onerror = function(ev) {
      setLog((prevLog) => 'ERROR: ' + ev.message + '<br/><hr>' + prevLog);
      console.error('WebSocket Error:', ev);
    };

    ws.current.onclose = function(ev) {
      setLog((prevLog) => 'CONNECTION CLOSED (Code: ' + ev.code + ')<br/><hr>' + prevLog);
      ws.current = null;
      console.log('WebSocket Closed:', ev);
    };
  };

  const can_Stop = () => {
    if (!ws.current) return;

    console.log('CAN 1 STOP Called');
    ws.current.send('CAN 1 STOP');
    setLog((prevLog) => `SENT: CAN 1 STOP<br/><hr>` + prevLog);
  };

  return (
    <div>
      <h1>WebSocket Test Client</h1>
      {/* Use the Button component */}
      <Button label="Connect" onClick={connect} />
      <Button label="Stop CAN 1" onClick={can_Stop} />
      <div>Event log:</div>
      <div id="log" dangerouslySetInnerHTML={{ __html: log }} />
    </div>
  );
}

export default App;
