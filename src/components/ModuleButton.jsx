import { useState, useRef } from 'react';

// Imported  styles:
import '../styles/ModuleButton.css';

// Imported  component:
import Led from './Led';

function ModuleButton({moduleName, isSelected, dataFromDevice}){

    // Function to get the correct CAN data based on the Module name and counter type
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
                return "N/A";  // Default value if no specific data is available
        }
    };

    // Inline styles for the LED
    const ledCSS = {
        marginTop: '1px',
        width: '17px',
        height: '17px',
        backgroundColor: 'greenYellow',
        borderRadius: '50%',
        boxShadow: `rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, greenYellow 0 1px 5px`
    };

    const setLedAccordingToStatusValue = (statusValue) => {
        const colors = {
            Error:          'red',
            Warning:        'orange',
            Preoperational: 'Blue',
            Configuring:    'Blue',
            Operational:    'GreenYellow',
            'Not existent': 'LightGray',
            'Ping timeout': 'SteelBlue',
            running:        'GreenYellow',
            unconfigured:   'LightGray',
            'bus off':      'red',
            'init mode':    'LightGray',
            'warning level':'orange',
            'data overrun': 'orange',
            'tx pending':   'green',
            'error passive':'orange',
            default:        'LightGray'
        };
        
        const color = colors[statusValue] || colors.default;
        
        return {
            ...ledCSS,
            backgroundColor: color,
            boxShadow: `rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, ${color} 0 1px 5px`
        };
    };
    

    return ( 
        <div className={`module-button  ${isSelected && 'highlight' } `}>
            <p>{moduleName}</p>
            <Led ledStyle={setLedAccordingToStatusValue(getDataAccordingToModuleName(moduleName, 'Status'))}/>
        </div>
    )

}

export default ModuleButton;