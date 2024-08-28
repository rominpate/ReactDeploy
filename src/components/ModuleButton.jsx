import { useState, useRef } from 'react';

// Imported  styles:
import '../styles/ModuleButton.css';

// Imported  component:
import Led from './Led';

function ModuleButton(){

    // Inline styles for the LED
    const ledCSS = {
        margin: '0',
        width: '16px',
        height: '16px',
        backgroundColor: 'greenYellow',
        borderRadius: '50%',
        boxShadow: `rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, greenYellow 0 1px 5px`
    };
    

    return ( 
        <div id='moduleButton' className='module-button'>
            <p>CAN Channel 1</p>
            <Led ledStyle={ledCSS}/>
        </div>
    )

}

export default ModuleButton;