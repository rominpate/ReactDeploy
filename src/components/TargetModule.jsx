import React, { useState, useRef, useEffect} from 'react';

// Imported styles:
import '../styles/TargetModule.css';

// Imported  component:
import Led from './Led';


const canData = {
    CAN1_RX_Counter : '0',
    CAN2_RX_Counter : '0',
    CAN3_RX_Counter : '0',
    CAN4_RX_Counter : '0',
    CAN5_RX_Counter : '0'
};

// Define an array of keys for the canData object
const keys = [
    'CAN1_RX_Counter',
    'CAN2_RX_Counter',
    'CAN3_RX_Counter',
    'CAN4_RX_Counter',
    'CAN5_RX_Counter'
];



function TargetModule({addLogMessage, setCount}) {

    

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prevCount => {
                //console.log("Current Count:", prevCount + 1); // Log the count to the console
                return prevCount + 1;
              });
        }, 1000);
    
        return () => clearInterval(interval); // Cleanup interval on component unmount
      }, []);
    



    // Initialize the WebSocket ref with null
    const ws = useRef(null);

    // State to manage the LED color
    const [ledColor, setLedColor] = useState('rgb(161, 160, 160)');


    // Event handler for start click
    function handleStartClick () {
        // Check if a WebSocket connection is not open or is closed
        if (!ws.current || ws.current.readyState === 3) {
            ws.current = new WebSocket(`ws://169.254.186.231:80/websocket`);

            ws.current.onopen = function () {
                setLedColor('greenYellow');
                addLogMessage('>> WebSocket connection opened');

                ws.current.send('Send Data');

                ws.current.onmessage = function(ev) {
                    var data = JSON.parse(ev.data);
 
                    data.map((string, index) => {
                        canData[keys[index]] = string.split('=')[1].trim();
                    })

                    // Use map to log all key-value pairs
                    Object.entries(canData).map(([key, value]) => {
                        addLogMessage(`${key}: ${value}`);
                    });

                    
                };
                
            };
            
            ws.current.onerror = function (ev) {
                setLedColor('red');
                addLogMessage('>> WebSocket connection error');
            };



        } else if (ws.current.readyState === 1){
            // WebSocket is already open, no need to create a new one
            addLogMessage('>> WebSocket connection is already open');
        } else {
            // when server is not started/running on the device (CAN@Net) 
            addLogMessage('>> No available server to open WebSocket connection');
        }
    };


    // Event handler for stop click
    const handleStopClick = () => {
        if (ws.current && ws.current.readyState === 1) {  // Only close if it's open
            ws.current.close();
            setLedColor('rgb(161, 160, 160)');
            addLogMessage('>> WebSocket connection closed');
        } else if (ws.current && ws.current.readyState === 3) {
            // WebSocket is already closed
            addLogMessage('>> WebSocket connection is already closed');
        } else {
            // WebSocket was never created or is in an invalid state
            addLogMessage('>> No WebSocket connection to close');
        }
    };

    // Inline styles for the LED
    const ledCSS = {
        margin: '0 auto',
        width: '24px',
        height: '24px',
        backgroundColor: ledColor,
        borderRadius: '50%',
        boxShadow: `rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, ${ledColor} 0 2px 12px`
    };
    
    return (
        <div id="targetModule">
            {/* <p className='target-module-heading'>Target</p> */}
            <div className="target-module-content">
                <div className='connection'>
                    <div>
                        {/* <img onClick={handleStartClick} className='start-image' src="./start.svg" alt="Start Icon" /> */}
                        <button onClick={handleStartClick} className='start-image'>C</button>
                    </div>
                    <div>
                        {/* <img onClick={handleStopClick} className='stop-image' src="./stop.svg" alt="Start Icon" /> */}
                        <button onClick={handleStopClick} className='stop-image'>D</button>
                    </div>
                </div>
                <div className='sts' >
                    <p>STS</p>
                    {/* <div class="led" ></div> */}
                    <Led ledStyle={ledCSS}/>
                </div>
                <div className='device' >
                    <p>Device:</p>
                    <p>CAN@net NT 420</p>
                </div>
                <div className='device-name' >
                    <p>Device Name:</p>
                    <p>DUT 4</p>
                </div>
                <div className='device-s-number' >
                    <p>Serial Number:</p>
                    <p>00100DDB</p>
                </div>
            </div>

        </div>
    );
}

export default TargetModule;




