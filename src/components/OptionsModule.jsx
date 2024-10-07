import React, { useState, useEffect } from 'react';

// Imported styles:
import '../styles/OptionsModule.css';

function OptionsModule({clearLayout, logScreenState}){

    return (
        <div id='optionsModule'>
            {/* <div className="options-module-content">
                <img  className='reset-layout-image' onClick={clearLayout} src="./reset.svg" alt="Reset Layout Image" />
                <img  className='console-image' onClick={logScreenState} src="./console.svg" alt="Console Image" />
                <img  className='statistics-image' src="./statistics.svg" alt="Reset Layout Image" />
                <img  className='question-image' src="./question.svg" alt="Question Image" />
                <img  className='setting-image' src="./setting.svg" alt="Setting Image" />
            </div> */}

            <div className="options-module-content">
                <button className='reset-layout-image' onClick={clearLayout}></button>
                <button className='console-image' onClick={logScreenState}></button>
                <button className='statistics-image'></button>
                <button className='question-image'></button>
                <button className='setting-image'></button>
            </div>

        </div>
    )


}

export default OptionsModule;