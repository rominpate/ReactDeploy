import React, { useState, useEffect, useRef} from 'react';

// Imported  styles:
import '../styles/LogModule.css';

// Imported  component:

function LogModule({ logInfo, clearLogData }) {
    const logContainerRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when the logInfo changes
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logInfo]);

    return (
        <div className='log-module'>
            <div className='heading'>
                <p>Log: </p>
                <button onClick={clearLogData} >Clear Log</button>
            </div>
            <div ref={logContainerRef} className='log-content'>
                {logInfo.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>
        </div>
    );
}

export default LogModule;