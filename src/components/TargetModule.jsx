import { useState, useRef } from 'react';

// Imported styles
import '../styles/TargetModule.css';

function TargetModule() {

    // State to manage the LED color
    const [ledColor, setLedColor] = useState('rgb(161, 160, 160)');

    // Event handler for start click
    const handleStartClick = () => {
        setLedColor('greenYellow');
    };

    // Event handler for stop click
    const handleStopClick = () => {
        setLedColor('red');
    };

    // Inline styles for the LED
    const ledStyle = {
        margin: '0 auto',
        width: '24px',
        height: '24px',
        backgroundColor: ledColor,
        borderRadius: '50%',
        boxShadow: `rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, ${ledColor} 0 2px 12px`
    };
    
    return (
        <div id="targetModule">
            <p className='target-module-heading'>Target</p>
            <div className="target-module-content">
                <div className='connection'>
                    <div>
                        <img onClick={handleStartClick} className='start-image' src="./start.svg" alt="Start Icon" />
                    </div>
                    <div>
                        <img onClick={handleStopClick} className='stop-image' src="./stop.svg" alt="Start Icon" />
                    </div>
                </div>
                <div className='sts' >
                    <p>STS</p>
                    <div class="led" style={ledStyle}></div>
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

export default TargetModule;
