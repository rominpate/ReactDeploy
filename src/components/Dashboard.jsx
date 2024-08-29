import { useState, useRef } from 'react';

// Imported  styles:
import '../styles/Dashboard.css';

// Imported  component:
import SelectModule from './SelectModule';
import TargetModule from './TargetModule';
import DeviceMetrics from './DeviceMetrics';
import OptionsModule from './OptionsModule';
import LogModule from './LogModule';
import ViewModule from './ViewModule';


function Dashboard(){
 return (
    <div id='dashboard'>
        <TargetModule/>
        <DeviceMetrics/>
        <OptionsModule/>
        <SelectModule/>
        <LogModule/>
        <ViewModule/>
    </div>
);
}

export default Dashboard;