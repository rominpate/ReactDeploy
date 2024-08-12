import { useState } from 'react'
import './App.css';


function App() {

  var ws;
  var E = function(id) { return document.getElementById(id); }

  var log = E('log');

  const connect = () => {
    if (ws) { ws.close(); return; }
    ws = new WebSocket(url.value);
    console.log(document.getElementById('connect').value);
    if (!ws) return;
    ws.onopen = function() { log.innerHTML += 'CONNECTION OPENED<br/>';};

    ws.onerror = function(ev) {
      log.innerHTML += 'ERROR: ' + ev.message + '<br/>';
      console.error('WebSocket Error:', ev);
    }

    ws.onclose = function(ev) {
      log.innerHTML += 'CONNECTION CLOSED (Code: ' + ev.code + ')<br/>';
      enable(false);
      ws = null;
      console.log('WebSocket Closed:', ev);
    }
    
  }

  return (
      <div>
        <h1>WebSocket Test Client</h1>
        {/* <input id="url" type="text" placeholder="Type URL" value={"ws://169.254.186.231:80/websocket"} /> */}
        <button id="connect"  value={"ws://169.254.186.231:80/websocket"} onClick={connect} >Connect</button>

        <div>Event log:</div>
        <div id="log"></div>
      </div>
  )
}

export default App
