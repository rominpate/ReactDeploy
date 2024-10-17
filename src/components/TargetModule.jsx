import React, { useState, useRef, useEffect} from 'react';

// Imported styles:
import '../styles/TargetModule.css';

// Imported  component:
import Led from './Led';

function TargetModule({addLogMessage, setDataFromDevice, dataFromDevice}) {

    function getStatus(sts) {
        switch (sts) {
            case '0': return  "none" ;
            case '1': return "No connection" ;
            case '2': return  "M/S conf. mismatch" ;
            case '3': return  "Ping timeout" ;
            case '5': return  "Operational";
            case '6': return  "Not existent";
            default: return  "Unknown status" ;
        }
    };

    function getCANStatus(sts) {
        switch (sts) {
            case 'n/a': return  "unconfigured" ;
            case '8': return  "bus off" ;
            case '16': return "init mode" ;
            case '4': return  "warning level" ;
            case '2': return  "data overrun" ;
            case '1': return  "tx pending"; ;
            case '32': return  "error passive";
            default: return  "running" ;
        }
    };
    
    function memPoolValues(val){
        var currNum = val % 0x10000;
        var totlNum = Math.floor(val / 0x10000);
        return `${currNum}/ ${totlNum}`;
    }

    // Initialize the WebSocket ref with null
    const ws = useRef(null);

    // State to manage the LED color
    const [ledColor, setLedColor] = useState('rgb(161, 160, 160)');

    // Reconnect on reload if WebSocket was open
    useEffect(() => {
        const wasConnected = sessionStorage.getItem("wsConnected") === "true";
        if (wasConnected) {
            handleStartClick();
        }

        return () => {
            if (ws.current && ws.current.readyState === 1) {
                ws.current.close();
            }
        };
    }, []);

    // Event handler for start click
    function handleStartClick () {
        // Check if a WebSocket connection is not open or is closed
        if (!ws.current || ws.current.readyState === 3) {
            ws.current = new WebSocket(`ws://169.254.186.231:80/websocket`);

            ws.current.onopen = function () {
                setLedColor('greenYellow');
                addLogMessage('>> WebSocket connection opened');

                ws.current.send('Send Data');
                sessionStorage.setItem("wsConnected", "true"); // Save connection status

                ws.current.onmessage = function(ev) {
                    var data = JSON.parse(ev.data);
                    console.log(`TargetModule >>onessage >>data : ${data}`)
                    //console.log(data[53]);

                    const parsedData = data.map(item => item.split('=')[1]);
                    //console.log(`TargetModule >>onessage >>parsedData : ${parsedData}`)

                    // Extract values after '=' for each string and assign it to parseData in array format.
                    //parsedData = [[0]'CAN_1_RX_Counter',            [1]'CAN_2_RX_Counter',         [2]'CAN_3_RX_Counter',    [3]'CAN_4_RX_Counter',
                    //              [4]'CAN_1_TX_Counter',            [5]'CAN_2_TX_Counter',         [6]'CAN_3_TX_Counter',    [7]'CAN_4_TX_Counter',
                    //              [8]'CAN_1_Err_Counter',           [9]'CAN_2_Err_Counter',        [10]'CAN_3_Err_Counter',  [11]'CAN_4_Err_Counter',
                    //              [12]'CAN_1_Ovr_Counter',          [13]'CAN_2_Ovr_Counter',       [14]'CAN_3_Ovr_Counter',  [15]'CAN_4_Ovr_Counter',
                    //              [16]'Mapping_Status_Counter',     [17]'Mapping_RX_Counter',      [18]'Mapping_TX_Counter',
                    //              [19]'MuxDemux_Status_Counter',    [20]'MuxDemux_RX_Counter',     [21]'MuxDemux_TX_Counter',
                    //              [22]'Cyclic_Status_Counter',      [23]'Cyclic_RX_Counter',       [24]'Cyclic_TX_Counter',
                    //              [25]'ActionRules_Status_Counter', [26]'ActionRules_RX_Counter',  [27]'ActionRules_TX_Counter',
                    //              [28]'LoadFilter_Status_Counter',  [29]'LoadFilters_RX_Counter',  [30]'LoadFilter_TX_Counter',
                    //              [31]'MQTT_Status_Counter',        [32]'MQTT_RX_Counter',         [33]'MQTT_TX_Counter',
                    //              [34]'Lua_Status_Counter',         [35]'Lua_RX_Counter',          [36]'Lua_TX_Counter',
                    //              [37]'Memory_Pool0',               [38]'Memory_Pool1',            [39]'Memory_Pool2',    [40]'Memory_Pool3',  [41]'Memory_Pool4',
                    //              [42]'Err_Status_Counter',         [43]'Err_AllocErr',            [44]'Err_MailboxErr'],
                    //              [45]'CAN_1_Status',               [46]'CAN_2_Status',            [47]'CAN_3_Status'],   [48]'CAN_4_Status']

                    //Set the state of dataFromDevice according to the data pushed by server
                    //This state would only be set when there is message from server side.
                    setDataFromDevice(() => {
                        return {
                            CAN1: {
                                Status:      getCANStatus(parsedData[45]),
                                RX_Counter:  parsedData[0], 
                                TX_Counter:  parsedData[4], 
                                Err_Counter: parsedData[8], 
                                Ovr_Counter: parsedData[12]
                            },
                            CAN2: {
                                Status:      getCANStatus(parsedData[46]),
                                RX_Counter:  parsedData[1], 
                                TX_Counter:  parsedData[5], 
                                Err_Counter: parsedData[9], 
                                Ovr_Counter: parsedData[13]
                            },
                            CAN3: {
                                Status:      getCANStatus(parsedData[47]),
                                RX_Counter:  parsedData[2], 
                                TX_Counter:  parsedData[6], 
                                Err_Counter: parsedData[10], 
                                Ovr_Counter: parsedData[14]
                            },
                            CAN4: {
                                Status:      getCANStatus(parsedData[48]),
                                RX_Counter:  parsedData[3], 
                                TX_Counter:  parsedData[7], 
                                Err_Counter: parsedData[11], 
                                Ovr_Counter: parsedData[15]
                            },
                            Mapping: {
                                Status:      getStatus(parsedData[16]),
                                RX_Counter:  parsedData[17], 
                                TX_Counter:  parsedData[18]
                            },
                            MuxDemux: {
                                Status:      getStatus(parsedData[19]),
                                RX_Counter:  parsedData[20], 
                                TX_Counter:  parsedData[21]
                            },
                            Cyclic: {
                                Status:      getStatus(parsedData[22]),
                                RX_Counter:  parsedData[23], 
                                TX_Counter:  parsedData[24]
                            },
                            ActionRules: {
                                Status:      getStatus(parsedData[25]),
                                RX_Counter:  parsedData[26], 
                                TX_Counter:  parsedData[27]
                            },
                            LoadFilter: {
                                Status:      getStatus(parsedData[28]),
                                RX_Counter:  parsedData[29], 
                                TX_Counter:  parsedData[30]
                            },
                            MQTT: {
                                Status:      getStatus(parsedData[31]),
                                RX_Counter:  parsedData[32], 
                                TX_Counter:  parsedData[33]
                            },
                            Lua: {
                                Status:      getStatus(parsedData[34]),
                                RX_Counter:  parsedData[35], 
                                TX_Counter:  parsedData[36]
                            },
                            Memory: {
                                Pool0:       memPoolValues(parsedData[37]),
                                Pool1:       memPoolValues(parsedData[38]), 
                                Pool2:       memPoolValues(parsedData[39]),
                                Pool3:       memPoolValues(parsedData[40]), 
                                Pool4:       memPoolValues(parsedData[41])
                            },
                            error: {
                                Status:      getStatus(parsedData[42]),
                                AllocErr:    parsedData[43], 
                                MailboxErr:  parsedData[44]
                            },
                            cpuLoad:{
                                cpuLoad:       data[51]
                            },
                            IP:{
                                IP:            data[52]
                            },
                            DeviceName:{
                                DeviceName:       data[53]
                            },
                            deviceVariant:{
                                deviceVariant: `CAN@Net NT ${data[54]}`
                            },
                            SerialNumber:{
                                SerialNumber:  data[55]
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
            sessionStorage.setItem("wsConnected", "false"); // Update connection status
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
                        <img onClick={handleStartClick} className='start-image' src="./start.svg" alt="Start Icon" />
                        {/* <button onClick={handleStartClick} className='start-image'>C</button> */}
                    </div>
                    <div>
                        <img onClick={handleStopClick} className='stop-image' src="./stop.svg" alt="Start Icon" />
                        {/* <button onClick={handleStopClick} className='stop-image'>D</button> */}
                    </div>
                </div>
                <div className='sts' >
                    <p>STS</p>
                    {/* <div class="led" ></div> */}
                    <Led ledStyle={ledCSS}/>
                </div>
                <div className='device' >
                    <p>Device Variant:</p>
                    {/* <p>{`CAN@Net NT ${dataFromDevice.deviceVariant.deviceVariant}`}</p> */}
                    <p>{dataFromDevice.deviceVariant.deviceVariant}</p>
                </div>
                <div className='device-IP' >
                    <p>Device IP:</p>
                    <p>{dataFromDevice.IP.IP}</p>
                </div>
                <div className='device-name' >
                    <p>Device Name:</p>
                    <p>{dataFromDevice.DeviceName.DeviceName}</p>
                </div>
                <div className='device-s-number' >
                    <p>Serial Number:</p>
                    <p>{dataFromDevice.SerialNumber.SerialNumber}</p>
                </div>
            </div>

        </div>
    );
}

export default TargetModule;