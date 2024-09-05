import { useState, useRef } from 'react';

// Imported styles:
import '../styles/OptionsModule.css';

function OptionsModule({clearLayout}){


    return (
        <div id='optionsModule'>
            <div className="options-module-content">
                <img  className='reset-layout-image' onClick={clearLayout} src="./reset.svg" alt="Reset Layout Image" />
                <img  className='console-image' src="./console.svg" alt="Console Image" />
                <img  className='statistics-image' src="./statistics.svg" alt="Reset Layout Image" />
                <img  className='question-image' src="./question.svg" alt="Question Image" />
                <img  className='setting-image' src="./setting.svg" alt="Setting Image" />
            </div>

        </div>
    )


}

export default OptionsModule;