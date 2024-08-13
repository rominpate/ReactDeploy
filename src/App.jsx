import { useState } from 'react'
import './App.css';

function App() {
  
  const getID = (id) => document.getElementById(id);
  const getClass = (className) => document.getElementsByClassName(className);

  const connect = () => {
    var ws;

    if (ws) { ws.close();  return;  }

    ws = new WebSocket(getID('connect').value);
    console.log(getID('connect').value);

    if (!ws) return;

    ws.onopen = function() { getID('log').innerHTML += 'CONNECTION OPENED<br/>'; }

    ws.onmessage = function(ev) { getID('log').innerHTML = `RECEIVED: ${ev.data}<br/>` + getID('log').innerHTML; }

    ws.onerror = function(ev) {
      getID('log').innerHTML += 'ERROR: ' + ev.message + '<br/>';
      console.error('WebSocket Error:', ev);
    };

    ws.onclose = function(ev) {
      getID('log').innerHTML += 'CONNECTION CLOSED (Code: ' + ev.code + ')<br/>';
      ws = null;
      console.log('WebSocket Closed:', ev);
    };
  };


  const can_Stop = () => {
    console.log('CAN 1 STOP CAlled');
    if (!ws) return;
    ws.send(getClass('canStop').value);
    getID('log').innerHTML = `SENT: CAN 1 STOP  <br/><hr>` + getID('log').innerHTML ; 
  }

  return (
    <div>
      <h1>WebSocket Test Client</h1>
      <button id="connect" className='button url' value="ws://169.254.186.231:80/websocket" onClick={connect}>Connect</button>
      <button className='button canStop' value="CAN 1 STOP" onClick={can_Stop}>Connect</button>
      <div>Event log:</div>
      <div id="log">hello</div>
    </div>
  );
}

export default App;
