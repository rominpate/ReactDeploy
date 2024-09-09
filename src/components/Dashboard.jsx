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
    // State for managing rows and clicked boxes, with initial values from localStorage
    const [firstRow, setFirstRow] = useState(() => {
        const savedFirstRow = localStorage.getItem('firstRow');
        return savedFirstRow ? JSON.parse(savedFirstRow) : [];
    });

    const [secondAndThirdRows, setSecondAndThirdRows] = useState(() => {
        const savedSecondAndThirdRows = localStorage.getItem('secondAndThirdRows');
        return savedSecondAndThirdRows ? JSON.parse(savedSecondAndThirdRows) : [];
    });

    const [clickedBoxes, setClickedBoxes] = useState(() => {
        const savedClickedBoxes = localStorage.getItem('clickedBoxes');
        return savedClickedBoxes ? JSON.parse(savedClickedBoxes) : [];
    });

    // Save state to localStorage whenever firstRow, secondAndThirdRows, or clickedBoxes change
    useEffect(() => {
        localStorage.setItem('firstRow', JSON.stringify(firstRow));
    }, [firstRow]);

    useEffect(() => {
        localStorage.setItem('secondAndThirdRows', JSON.stringify(secondAndThirdRows));
    }, [secondAndThirdRows]);

    useEffect(() => {
        localStorage.setItem('clickedBoxes', JSON.stringify(clickedBoxes));
    }, [clickedBoxes]);


    // Function to handle button click (module clicked) from the SelectModule component.
    const handleButtonClick = (eachModuleName) => {
        // Only display the corresponding module if it is not already displayed.
        if (!clickedBoxes.includes(eachModuleName)) {
            // Handle buttons 1 to 4 (First row)
            if (['CAN Channel 1', 'CAN Channel 2', 'CAN Channel 3', 'CAN Channel 4'].includes(eachModuleName)) {
                // Updates the firstRow array
                setFirstRow((prev) => {
                    const updatedFirstRow = [  ...prev, eachModuleName];
                    return updatedFirstRow;
                });
                // Updates the ClickedBoxes array
                setClickedBoxes((prev) => {
                    const updatedClickedBoxes = [ ...prev, eachModuleName];
                    return updatedClickedBoxes;
                });
            // Handle buttons 5 to 13 (Second and Third rows)
            } else {
                // Updates the SecondAndThirdRows array
                setSecondAndThirdRows((prev) => {
                    const updatedSecondAndThirdRows = [ ...prev, eachModuleName];
                    return updatedSecondAndThirdRows;
                });
                // Updates the ClickedBoxes array
                setClickedBoxes((prev) => {
                    const updatedClickedBoxes = [  ...prev, eachModuleName];
                    return updatedClickedBoxes;
                });
            }

        }
    };


    // To clear everything from LocalStorage which is the web storage
    function clearAllData () {
        localStorage.removeItem('firstRow');
        localStorage.removeItem('secondAndThirdRows');
        localStorage.removeItem('clickedBoxes');
        setFirstRow([]);
        setSecondAndThirdRows([]);
        setClickedBoxes([]);
    };

    // To 
    function undisplayModule(moduleName){
        // Condition to decide which function to all according to module name
        if(['CAN Channel 1', 'CAN Channel 2', 'CAN Channel 3', 'CAN Channel 4'].includes(moduleName)){
            setFirstRow((prev) => {
                return prev.filter((item) => {
                    return item !== moduleName;
                })
            });

            setClickedBoxes((prev) => {
                return prev.filter((item) => {
                    return item !== moduleName;
                })
            });

        } else {
            setSecondAndThirdRows((prev) => {
                return prev.filter((item) => {
                    return item !== moduleName;
                })
            });

            setClickedBoxes((prev) => {
                return prev.filter((item) => {
                    return item !== moduleName;
                })
            });
        }      
    };
    

    return (
        <div id="dashboard">
            <TargetModule />
            <DeviceMetrics />
            <OptionsModule 
                clearLayout={clearAllData}
            />
            <SelectModule 
                handleButtonClick={handleButtonClick}
                clickedBoxes={clickedBoxes}
            />
            <LogModule />
            <ViewModule
                firstRow={firstRow}
                secondAndThirdRows={secondAndThirdRows}
                undisplayModule={undisplayModule}
            />
        </div>
    );
}

export default Dashboard;
