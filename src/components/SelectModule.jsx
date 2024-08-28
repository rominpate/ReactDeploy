import { useState, useRef } from 'react';

// Imported  styles:
import '../styles/SelectModule.css';

// Imported  component:
import ModuleButton from './ModuleButton';

function SelectModule(){

    return ( 
        <div id='selectModule'>
            <div className='module-button-container'> <ModuleButton/></div>
            <div className='module-button-container'><ModuleButton/></div>
            <div className='module-button-container'><ModuleButton/></div>
            <div className='module-button-container'></div>
            <div className='module-button-container'></div>
            <div className='module-button-container'></div>
            <div className='module-button-container'></div>
            <div className='module-button-container'></div>
            <div className='module-button-container'></div>
            <div className='module-button-container'></div>
        </div>
    )

}

export default SelectModule;