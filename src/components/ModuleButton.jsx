import { useState, useRef } from 'react';

// Imported  styles:
import '../styles/ModuleButton.css';

// Imported  component:
import Led from './Led';

function ModuleButton({moduleName, isSelected }){


    

    return ( 
        <div className={`module-button  ${isSelected && 'highlight' } `}>
            <p>{moduleName}</p>
            <Led/>
        </div>
    )

}

export default ModuleButton;