import React from 'react';

// Imported styles
import '../styles/EachModule.css';

// Imported component
import Led from './Led';

function EachModule({ moduleName, closeModule, dataFromDevice }) {
    const getDataAccordingToModuleName = (moduleName, counterType) => {
        switch (moduleName) {
            case "CAN Channel 1":
                return dataFromDevice.CAN1[counterType] || "N/A or Error getting the Value";
            case "CAN Channel 2":
                return dataFromDevice.CAN2[counterType] || "N/A or Error getting the Value";
            case "CAN Channel 3":
                return dataFromDevice.CAN3[counterType] || "N/A or Error getting the Value";
            case "CAN Channel 4":
                return dataFromDevice.CAN4[counterType] || "N/A or Error getting the Value";
            case "Mapping":
                return dataFromDevice.Mapping[counterType] || "-";
            case "Mux / Demux":
                return dataFromDevice.MuxDemux[counterType] || "-";
            case "Cyclic":
                return dataFromDevice.Cyclic[counterType] || "-";
            case "Action Rules":
                return dataFromDevice.ActionRules[counterType] || "-";
            case "Load Filter":
                return dataFromDevice.LoadFilter[counterType] || "-";
            case "MQTT":
                return dataFromDevice.MQTT[counterType] || "-";
            case "Lua":
                return dataFromDevice.Lua[counterType] || "-";
            case "Memory":
                return dataFromDevice.Memory[counterType] || "-";
            case "Error":
                return dataFromDevice.error[counterType] || "-";
            default:
                return "N/A"; 
        }
    };

    const setLedAccordingToStatusValue = (statusValue) => {
        const colors = {
            Error: 'red',
            Warning: 'orange',
            Preoperational: 'Blue',
            Configuring: 'Blue',
            Operational: 'GreenYellow',
            'Not existent': 'LightGray',
            'Ping timeout': 'SteelBlue',
            running: 'GreenYellow',
            unconfigured: 'LightGray',
            'bus off': 'red',
            'init mode': 'LightGray',
            'warning level': 'orange',
            'data overrun': 'orange',
            'tx pending': 'green',
            'error passive': 'orange',
            default: 'LightGray'
        };
        
        const color = colors[statusValue] || colors.default;
        
        return {
            marginTop: '1px',
            width: '18px',
            height: '18px',
            backgroundColor: color,
            borderRadius: '50%',
            boxShadow: `rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, ${color} 0 1px 5px`
        };
    };

    let [class1, class2, class3] = ['CAN Channel 1', 'CAN Channel 2', 'CAN Channel 3', 'CAN Channel 4'].includes(moduleName) ? 
        ['each-can-module', 'can-module-name', 'can-module-info'] : 
        ['each-other-module', 'other-module-name', 'other-module-info'];

    const renderMemoryModule = () => (
        <div className={class3}>
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index}>
                    <label htmlFor={`Pool ${index}`}>Pool {index}:</label>
                    <input type="text" id={`Pool ${index}`} value={getDataAccordingToModuleName(moduleName, `Pool${index}`)} readOnly /><br />
                </div>
            ))}
        </div>
    );

    const renderErrorModule = () => (
        <div className={class3}>
            <div>
                <label htmlFor="status">Status: <Led ledStyle={setLedAccordingToStatusValue(getDataAccordingToModuleName(moduleName, 'Status'))}/></label>
                <input type="text" id="status" value={getDataAccordingToModuleName(moduleName, 'Status')} readOnly /><br />
            </div>
            <div>
                <label htmlFor="Alloc Err">Alloc Err:</label>
                <input type="text" id="Alloc Err" value={getDataAccordingToModuleName(moduleName, 'AllocErr')} readOnly /><br />
            </div>
            <div>
                <label htmlFor="Mailbox Err">Mailbox Err:</label>
                <input type="text" id="Mailbox Err" value={getDataAccordingToModuleName(moduleName, 'MailboxErr')} readOnly /><br />
            </div>
            <div>
                <label htmlFor="err-counter">Err counter:</label>
                <input type="text" id="err-counter" value={getDataAccordingToModuleName(moduleName, 'Err_Counter')} readOnly /><br />
            </div>
            <div>
                <label htmlFor="ovr-counter">Ovr counter:</label>
                <input type="text" id="ovr-counter" value={getDataAccordingToModuleName(moduleName, 'Ovr_Counter')} readOnly /><br />
            </div>
        </div>
    );

    const renderDefaultModule = () => (
        <div className={class3}>
            <div>
                <label htmlFor="status">Status: <Led ledStyle={setLedAccordingToStatusValue(getDataAccordingToModuleName(moduleName, 'Status'))}/></label>
                <input type="text" id="status" value={getDataAccordingToModuleName(moduleName, 'Status')} readOnly/><br />
            </div>
            <div>
                <label htmlFor="rx-counter">RX counter:</label>
                <input type="text" id="rx-counter" value={getDataAccordingToModuleName(moduleName, 'RX_Counter')} readOnly /><br />
            </div>
            <div>
                <label htmlFor="tx-counter">TX counter:</label>
                <input type="text" id="tx-counter" value={getDataAccordingToModuleName(moduleName, 'TX_Counter')} readOnly /><br />
            </div>
            <div>
                <label htmlFor="err-counter">Err counter:</label>
                <input type="text" id="err-counter" value={getDataAccordingToModuleName(moduleName, 'Err_Counter')} readOnly /><br />
            </div>
            <div>
                <label htmlFor="ovr-counter">Ovr counter:</label>
                <input type="text" id="ovr-counter" value={getDataAccordingToModuleName(moduleName, 'Ovr_Counter')} readOnly /><br />
            </div>
        </div>
    );

    return (
        <div id={moduleName} className={class1}>
            <h4 className={class2}>{moduleName}</h4>
            <img src="./info.svg" alt="" />
            <span onClick={() => { closeModule(moduleName) }}>X</span>
            {moduleName === 'Memory' ? renderMemoryModule() : moduleName === 'Error' ? renderErrorModule() : renderDefaultModule()}
        </div>
    );
}

export default EachModule;
