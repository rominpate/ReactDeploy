import { useState, useRef } from 'react';

// Imported  styles:
import '../styles/Dashboard.css';

// Imported  component:
import SelectModule  from   './SelectModule';
import TargetModule  from   './TargetModule';
import DeviceMetrics from   './DeviceMetrics';
import OptionsModule from   './OptionsModule';
import LogModule     from   './LogModule';
import ViewModule    from   './ViewModule';
import EachModule from './EachModule';


function Dashboard(){

     // State to keep track of the boxes in each row
     const [firstRow, setFirstRow] = useState([null, null, null, null]);
     const [secondAndThirdRows, setSecondAndThirdRows] = useState([null, null, null, null, null, null, null, null, null, null]);
     const [clickedBoxes, setClickedBoxes] = useState([]); // New state for tracking clicked boxes
 
     // Function to handle button click (module clicked) from the Select Module component.
     const handleButtonClick = (eachModuleName, buttonNumber) => {
        if (clickedBoxes.includes(buttonNumber)) {

        } else {
            if (buttonNumber >= 1 && buttonNumber <= 4) {
                // Handle buttons 1 to 4 (First row)
                const emptyIndex = firstRow.indexOf(null); //If there are no empty columns (indexOf(null) returns -1)
                if (emptyIndex !== -1) {
                    const newFirstRow = [...firstRow];
                    newFirstRow[emptyIndex] = <EachModule moduleName={eachModuleName}/>
                    setFirstRow(newFirstRow);
                    setClickedBoxes([...clickedBoxes, buttonNumber]); // Track this box as clicked
                }
            } else if (buttonNumber >= 5 && buttonNumber <= 13) {
                // Handle buttons 5 to 13 (Second and Third rows)
                const emptyIndex = secondAndThirdRows.indexOf(null);
                if (emptyIndex !== -1) {
                    const newSecondAndThirdRows = [...secondAndThirdRows];
                    newSecondAndThirdRows[emptyIndex] = <EachModule moduleName={eachModuleName}/>
                    setSecondAndThirdRows(newSecondAndThirdRows);
                    setClickedBoxes([...clickedBoxes, buttonNumber]); // Track this box as clicked
                }
            }  
        }
     };

    return (
        <div id='dashboard'>
            <TargetModule/>
            <DeviceMetrics/>
            <OptionsModule/>
            <SelectModule handleButtonClick={handleButtonClick}/>
            <LogModule/>
            <ViewModule 
                firstRow={firstRow} 
                secondAndThirdRows={secondAndThirdRows}
            />
        </div>
    );
}

export default Dashboard;