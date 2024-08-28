import { useState, useRef } from 'react';

// Imported styles:
import '../styles/OptionsModule.css';

function OptionsModule(){
    return (
        <div id='optionsModule'>
            <div className="options-module-content">
                <img  className='reset-layout-image' src="./reset.png" alt="Reset Layout Image" />
                <img  className='console-image' src="./console.png" alt="Console Image" />
                <img  className='statistics-image' src="./statistics.png" alt="Reset Layout Image" />
                <img  className='question-image' src="./question.png" alt="Question Image" />
                <img  className='setting-image' src="./setting.png" alt="Setting Image" />
            </div>

        </div>
    )


}

export default OptionsModule;