import { useState, useRef } from 'react';

// Imported  styles
import '../styles/Dashboard.css';

// Imported  component
import SelectModule from './SelectModule';
import TargetModule from './TargetModule';
import DeviceMetrics from './DeviceMetrics';


function Dashboard(){
 return (
    <div id='dashboard'>
        <TargetModule/>
        <DeviceMetrics/>
        <SelectModule/>
    </div>
);
}

export default Dashboard;