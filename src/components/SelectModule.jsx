import { useState, useRef } from 'react';

// Imported  styles:
import '../styles/SelectModule.css';

// Imported  component:
import ModuleButton from './ModuleButton';

function SelectModule({ handleButtonClick }){

    const CANatNetModuleName =['CAN Channel 1', 'CAN Channel 2', 'CAN Channel 3', 'CAN Channel 4',
        'Mapping', 'Mux / Demux', 'Cyclic', 'Action Rules', 'Load Filter', 'MQTT', 'Lua', 
        'Memory', 'Error'];

    return ( 
        <div id='selectModule'>
            {CANatNetModuleName.map((eachModuleName, index) => {
                return (
                    <div  key={index} className='module-button-container' onClick={() => handleButtonClick(eachModuleName, index + 1)}>
                        <ModuleButton moduleName={eachModuleName}/>
                    </div>
                )
            })
            }
        </div>
    )

}

export default SelectModule;