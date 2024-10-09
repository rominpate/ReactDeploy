import React, { useState, useRef, useEffect} from 'react';

// Imported styles:
import '../styles/TargetModule.css';

// Imported  component:
import Led from './Led';

function TargetModule({addLogMessage, setDataFromDevice}) {

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
                    console.log(`TargetModule >>onessage >>ev.data : ${ev.data}`)

                    // Extract values after '=' for each string and assign it to parseData in array format.
                    //parsedData = ['CAN_1_RX_Counter', 'CAN_2_RX_Counter', 'CAN_3_RX_Counter', 'CAN_4_RX_Counter',
                    //              'CAN_1_TX_Counter', 'CAN_2_TX_Counter', 'CAN_3_TX_Counter', 'CAN_4_TX_Counter',
                    //              'Mapping_RX_Counter', Mapping_TX_Counter]
                    const parsedData = data.map(item => item.split('=')[1].trim());

                    //Set the state of dataFromDevice according to the data pushed by server
                    //This state would only be set when there is message from server side.
                    setDataFromDevice(prevData => {
                        return {
                            CAN1: {
                                RX_Counter: parsedData[0], 
                                TX_Counter: parsedData[4], 
                                Err_Counter: prevData.CAN1.Err_Counter, 
                                Ovr_Counter: prevData.CAN1.Ovr_Counter
                            },
                            CAN2: {
                                RX_Counter: parsedData[1], 
                                TX_Counter: parsedData[5], 
                                Err_Counter: prevData.CAN2.Err_Counter, 
                                Ovr_Counter: prevData.CAN2.Ovr_Counter
                            },
                            CAN3: {
                                RX_Counter: parsedData[2], 
                                TX_Counter: parsedData[6], 
                                Err_Counter: prevData.CAN3.Err_Counter, 
                                Ovr_Counter: prevData.CAN3.Ovr_Counter
                            },
                            CAN4: {
                                RX_Counter: parsedData[3], 
                                TX_Counter: parsedData[7], 
                                Err_Counter: prevData.CAN4.Err_Counter, 
                                Ovr_Counter: prevData.CAN4.Ovr_Counter
                            },
                            Mapping: {
                                RX_Counter: parsedData[8], 
                                TX_Counter: parsedData[9],
                            }
                        }
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