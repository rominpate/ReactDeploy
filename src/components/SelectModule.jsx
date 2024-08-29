import { useState, useRef } from 'react';

// Imported  styles:
import '../styles/SelectModule.css';

// Imported  component:
import ModuleButton from './ModuleButton';

function SelectModule(){

    return ( 
        <div id='selectModule'>
            <div className='module-button-container'><ModuleButton moduleName='CAN Channel 1'/></div>
            <div className='module-button-container'><ModuleButton moduleName='CAN Channel 2'/></div>
            <div className='module-button-container'><ModuleButton moduleName='CAN Channel 3'/></div>
            <div className='module-button-container'><ModuleButton moduleName='CAN Channel 4'/></div>
            <div className='module-button-container'><ModuleButton moduleName='Mapping'/></div>
            <div className='module-button-container'><ModuleButton moduleName='Mux / Demux'/></div>
            <div className='module-button-container'><ModuleButton moduleName='Cyclic'/></div>
            <div className='module-button-container'><ModuleButton moduleName='Action Rules'/></div>
            <div className='module-button-container'><ModuleButton moduleName='Load Filter'/></div>
            <div className='module-button-container'><ModuleButton moduleName='MQTT'/></div>
            <div className='module-button-container'><ModuleButton moduleName='Lua'/></div>
            <div className='module-button-container'><ModuleButton moduleName='Memory'/></div>
            <div className='module-button-container'><ModuleButton moduleName='Error'/></div>
        </div>
    )

}

export default SelectModule;