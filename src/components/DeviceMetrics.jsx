import { useState, useRef } from 'react';

// Imported styles:
import '../styles/DeviceMetrics.css';

function DeviceMetrics({dataFromDevice}){

    return (
        <div id='deviceMetrics'>
            {/* <p className='device-metrics-heading'>Device Metrics</p> */}
            <div className="device-metrics-content">
                <div className='cpu-load' >
                    <p>CPU Load:</p>
                    <p>{`${dataFromDevice.cpuLoad.cpuLoad}%`}</p>
                </div>
                <div className='run-time' >
                    <p>Runtime:</p>
                    <p>0:12:49</p>
                </div>
                <div className='bandwidth' >
                    <p>Band Width:</p>
                    <p>125</p>
                </div>

            </div>

        </div>
    )


}

export default DeviceMetrics;