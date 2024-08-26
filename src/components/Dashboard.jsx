import { useState, useRef } from 'react';

// Imported  styles
import '../styles/Dashboard.css';

// Imported  component
import SelectModule from './SelectModule';
import InfoModule from './InfoModule';


function Dashboard(){
 return (
    <div id='dashboard'>
        <InfoModule/>
        <SelectModule/>
    </div>
);
}

export default Dashboard;