import React from 'react'; // Import React (optional in newer versions, but good practice)

// Imported styles
import '../styles/InfoModule.css';

function InfoModule() {
    return (
        <div id="infoModule">
            <p className='info-Module-heading'>Target</p>
            <div className="info-module-content">
                <div className='connection'>
                    <img className='start-image' src="./start.svg" alt="Start Icon" />
                    <img className='stop-image' src="./stop.svg" alt="Start Icon" />
                </div>
                <div className='device' >
                    <p>Device:</p>
                    <p>CAN@net NT 420</p>
                </div>
                <div className='device-name' >
                    <p>Device Name:</p>
                    <p>DUT 4</p>
                </div>
                <div className='device-s-number' >
                    <p>Serial Number:</p>
                    <p>00100DDB</p>
                </div>
            </div>

        </div>
    );
}

export default InfoModule;
