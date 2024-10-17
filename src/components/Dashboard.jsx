import React, { useState, useEffect } from 'react';

// Imported  styles:
import '../styles/Dashboard.css';

// Imported  component:
import SelectModule     from    './SelectModule';
import TargetModule     from    './TargetModule';
import DeviceMetrics    from    './DeviceMetrics';
import OptionsModule    from    './OptionsModule';
import LogModule        from    './LogModule';
import ViewModule       from    './ViewModule';
import LogScreen        from    './LogScreen';    

function Dashboard() {

    // State for managing rows and clicked boxes, with initial values from localStorage
    const [firstRow, setFirstRow] = useState(() => {
        const savedFirstRow = localStorage.getItem('firstRow');
        return savedFirstRow ? JSON.parse(savedFirstRow) : [];
    });

    const [secondAndThirdRows, setSecondAndThirdRows] = useState(() => {
        const savedSecondAndThirdRows = localStorage.getItem('secondAndThirdRows');
        return savedSecondAndThirdRows ? JSON.parse(savedSecondAndThirdRows) : [];
    });

    const [clickedBoxes, setClickedBoxes] = useState(() => {
        const savedClickedBoxes = localStorage.getItem('clickedBoxes');
        return savedClickedBoxes ? JSON.parse(savedClickedBoxes) : [];
    });

    // State for showing Log Screen
    const [logScreen, setLogScreen] = useState(false);

    // State to change the Log module content in array form
    const [logInfo, setLogInfo] = useState(() => {
        const savedLogInfo = localStorage.getItem('logInfo');
        return savedLogInfo
            ? JSON.parse(savedLogInfo)
            : [`>> CAN@net NT 420  V6.04.00  with serial number 'HW907899' and IP address '169.254.186.231' connected`];
    });
      
    // State for the data coming from device server
    const [dataFromDevice, setDataFromDevice] = useState({
        CAN1:          {Status: '-',  RX_Counter: '-', TX_Counter: '-', Err_Counter: '-', Ovr_Counter: '-'},
        CAN2:          {Status: '-',  RX_Counter: '-', TX_Counter: '-', Err_Counter: '-', Ovr_Counter: '-'},
        CAN3:          {Status: '-',  RX_Counter: '-', TX_Counter: '-', Err_Counter: '-', Ovr_Counter: '-'},
        CAN4:          {Status: '-',  RX_Counter: '-', TX_Counter: '-', Err_Counter: '-', Ovr_Counter: '-'},
        Mapping:       {Status: '-',  RX_Counter: '-', TX_Counter: '-'},
        MuxDemux:      {Status: '-',  RX_Counter: '-', TX_Counter: '-'},
        Cyclic:        {Status: '-',  RX_Counter: '-', TX_Counter: '-'},
        ActionRules:   {Status: '-',  RX_Counter: '-', TX_Counter: '-'},
        LoadFilter:    {Status: '-',  RX_Counter: '-', TX_Counter: '-'},
        MQTT:          {Status: '-',  RX_Counter: '-', TX_Counter: '-'},
        Lua:           {Status: '-',  RX_Counter: '-', TX_Counter: '-'},
        Memory:        {Pool0: '-',  Pool1: '-', Pool2: '-', Pool3: '-', Pool4: '-'},
        error:         {Status: '-',  AllocErr: '-', MailboxErr: '-'},
        IP:            {IP: '-'},
        DeviceName:    {DeviceName: '-'},
        cpuLoad:       {cpuLoad: '-'},
        deviceVariant: {deviceVariant: '-'},
        SerialNumber:  {SerialNumber: '-'}
      });

    //console.log('dashboard', dataFromDevice);

    // Save state to localStorage whenever logInfo changes.
    useEffect(() => {
        localStorage.setItem('logInfo', JSON.stringify(logInfo));
    }, [logInfo]);


    // Function to add a new log message
    const addLogMessage = (newMessage) => {
        setLogInfo((prev) => [...prev, newMessage]);
    };

    // To clear everything from log module's web storage
    function clearLogData () {
        localStorage.removeItem('logInfo');
        // Reset logInfo state to the initial log message
        setLogInfo([`>> CAN@net NT 420  V6.04.00  with serial number 'HW907899' and IP address '169.254.186.231' connected`]);
    };


    function logScreenState(){
        setLogScreen(!logScreen);
    };


    // Save state to localStorage whenever firstRow, secondAndThirdRows, or clickedBoxes change
    useEffect(() => {
        localStorage.setItem('firstRow', JSON.stringify(firstRow));
    }, [firstRow]);

    useEffect(() => {
        localStorage.setItem('secondAndThirdRows', JSON.stringify(secondAndThirdRows));
    }, [secondAndThirdRows]);

    useEffect(() => {
        localStorage.setItem('clickedBoxes', JSON.stringify(clickedBoxes));
    }, [clickedBoxes]);


    // Function to handle button click (module clicked) from the SelectModule component.
    const handleButtonClick = (eachModuleName) => {
        // Only display the corresponding module if it is not already displayed.
        if (!clickedBoxes.includes(eachModuleName)) {
            // Handle buttons 1 to 4 (First row)
            if (['CAN Channel 1', 'CAN Channel 2', 'CAN Channel 3', 'CAN Channel 4'].includes(eachModuleName)) {
                // Updates the firstRow array
                setFirstRow((prev) => {
                    const updatedFirstRow = [  ...prev, eachModuleName];
                    return updatedFirstRow;
                });
                // Updates the ClickedBoxes array
                setClickedBoxes((prev) => {
                    const updatedClickedBoxes = [ ...prev, eachModuleName];
                    return updatedClickedBoxes;
                });
            // Handle buttons 5 to 13 (Second and Third rows)
            } else {
                // Updates the SecondAndThirdRows array
                setSecondAndThirdRows((prev) => {
                    const updatedSecondAndThirdRows = [ ...prev, eachModuleName];
                    return updatedSecondAndThirdRows;
                });
                // Updates the ClickedBoxes array
                setClickedBoxes((prev) => {
                    const updatedClickedBoxes = [  ...prev, eachModuleName];
                    return updatedClickedBoxes;
                });
            }

        } else {
            undisplayModule(eachModuleName)
        }
    };


    // To clear everything from LocalStorage which is the web storage
    function clearAllData () {
        localStorage.removeItem('firstRow');
        localStorage.removeItem('secondAndThirdRows');
        localStorage.removeItem('clickedBoxes');
        setFirstRow([]);
        setSecondAndThirdRows([]);
        setClickedBoxes([]);
    };

    // To 
    function undisplayModule(moduleName){
        // Condition to decide which function to all according to module name
        if(['CAN Channel 1', 'CAN Channel 2', 'CAN Channel 3', 'CAN Channel 4'].includes(moduleName)){
            setFirstRow((prev) => {
                return prev.filter((item) => {
                    return item !== moduleName;
                })
            });

            setClickedBoxes((prev) => {
                return prev.filter((item) => {
                    return item !== moduleName;
                })
            });

        } else {
            setSecondAndThirdRows((prev) => {
                return prev.filter((item) => {
                    return item !== moduleName;
                })
            });

            setClickedBoxes((prev) => {
                return prev.filter((item) => {
                    return item !== moduleName;
                })
            });
        }      
    };
    

    return (
        <div id="dashboard">
            <TargetModule 
                addLogMessage={addLogMessage}
                setDataFromDevice={setDataFromDevice}
                dataFromDevice={dataFromDevice}
            />

            <DeviceMetrics dataFromDevice={dataFromDevice}/>

            <OptionsModule 
                clearLayout={clearAllData}
                logScreenState={logScreenState}
            />

            <SelectModule 
                handleButtonClick={handleButtonClick}
                clickedBoxes={clickedBoxes}
                dataFromDevice={dataFromDevice}
            />
            <LogModule 
                logInfo={logInfo}
                clearLogData={clearLogData}
            />

            { !logScreen ? (
                <ViewModule
                    firstRow={firstRow}
                    secondAndThirdRows={secondAndThirdRows}
                    undisplayModule={undisplayModule}
                    dataFromDevice={dataFromDevice}
                />
            ) : (<LogScreen/>)}
        </div>
    );
}

export default Dashboard;
