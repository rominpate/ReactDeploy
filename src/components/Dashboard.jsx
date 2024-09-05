import React, { useState, useEffect } from 'react';
// Imported  styles:
import '../styles/Dashboard.css';

// Imported  component:
import SelectModule     from    './SelectModule';
import TargetModule     from    './TargetModule';
import DeviceMetrics    from    './DeviceMetrics';
import OptionsModule    from    './OptionsModule';
import LogModule        from    './LogModule';
import ViewModule       from    './ViewModule';

function Dashboard() {
    // State for managing rows and clicked boxes
    const [firstRow, setFirstRow] = useState([]);
    const [secondAndThirdRows, setSecondAndThirdRows] = useState([]);
    const [clickedBoxes, setClickedBoxes] = useState([]);

    // Function to handle button click (module clicked) from the Select Module component.
    const handleButtonClick = (eachModuleName, buttonNumber) => {
        if (clickedBoxes.includes(buttonNumber)) {
            // Do nothing.....
        } else {
            if (buttonNumber >= 1 && buttonNumber <= 4) {
                // Handle buttons 1 to 4 (First row)
                setFirstRow((prev) => {
                    const updatedFirstRow = [...prev, eachModuleName];
                    return updatedFirstRow;
                });
                setClickedBoxes((prev) => {
                    const updatedClickedBoxes = [...prev, buttonNumber];
                    return updatedClickedBoxes;
                });
            } else if (buttonNumber >= 5 && buttonNumber <= 13) {
                // Handle buttons 5 to 13 (Second and Third rows)
                setSecondAndThirdRows((prev) => {
                    const updatedSecondAndThirdRows = [...prev, eachModuleName];
                    return updatedSecondAndThirdRows;
                });
                setClickedBoxes((prev) => {
                    const updatedClickedBoxes = [...prev, buttonNumber];
                    return updatedClickedBoxes;
                });
            }
        }
    };

    return (
        <div id="dashboard">
            <TargetModule />
            <DeviceMetrics />
            <OptionsModule />
            <SelectModule handleButtonClick={handleButtonClick} />
            <LogModule />
            <ViewModule
                firstRow={firstRow}
                secondAndThirdRows={secondAndThirdRows}
            />
        </div>
    );
}

export default Dashboard;
