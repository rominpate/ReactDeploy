import React, { useState } from 'react';

// Imported  styles:
import '../styles/SelectModule.css';

// Imported  component:
import ModuleButton from './ModuleButton';

function SelectModule({ handleButtonClick, clickedBoxes, dataFromDevice}){

    const CANatNetModuleName =['CAN Channel 1', 'CAN Channel 2', 'CAN Channel 3', 'CAN Channel 4',
        'Mapping', 'Mux / Demux', 'Cyclic', 'Action Rules', 'Load Filter', 'MQTT', 'Lua', 
        'Memory', 'Error'];


    return ( 
        <div className='selectModule'>
            {CANatNetModuleName.map((eachModuleName, index) => {
                return (
                    <div  key={index} className='module-button-container' onClick={() => {handleButtonClick(eachModuleName)}}>
                        <ModuleButton moduleName={eachModuleName}  isSelected={clickedBoxes.includes(eachModuleName)} dataFromDevice={dataFromDevice} />
                    </div>
                )
            })
            }
        </div>
    )

}

export default SelectModule;