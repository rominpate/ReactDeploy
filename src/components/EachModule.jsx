import React, { useState, useEffect } from 'react';

// Imported  styles:
import '../styles/EachModule.css';

// Imported  component:
import Led from './Led';



function EachModule({ moduleName, closeModule, count}) {

    //Assignment of the className according to the Module Selected.
    //Need this because other module except other module has different CSS Styling
    let [class1, class2, class3]= ['CAN Channel 1', 'CAN Channel 2', 'CAN Channel 3', 'CAN Channel 4'].includes(moduleName) ? 
                                ['each-can-module', 'can-module-name', 'can-module-info' ] : 
                                ['each-other-module', 'other-module-name', 'other-module-info' ];


    // Inline styles for the LED
    const ledCSS = {
        marginTop: '1px',
        width: '14px',
        height: '14px',
        backgroundColor: 'greenYellow',
        borderRadius: '50%',
        boxShadow: `rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, greenYellow 0 1px 5px`
    };
    


    return (
            <div id={moduleName} className={class1} >
                <h4 className={class2}>{moduleName}</h4>
                <img src="./info.svg" alt="" />
                <span onClick={()=>{closeModule(moduleName)}}>X</span>
                <div className={class3}>
                    <div>
                    {/* to show the status  */}
                        <label for="status">Status: <Led ledStyle={ledCSS}/></label>
                        <input type="text" id="status" value="Running" readOnly/><br />
                    </div>
                    
                    <div>
                    {/* to show RX counter  */}
                        <label for="rx-counter">RX counter:</label>
                        <input type="text" id="rx-counter" value={count} readOnly/><br />
                    </div>

                    <div>
                    {/* to show TX counter  */}
                        <label for="tx-counter">TX counter:</label>
                        <input type="text" id="tx-counter" value="1416" readOnly /><br />
                    </div>

                    <div>
                    {/* to show Error counter  */}
                        <label for="err-counter">Err counter:</label>
                        <input type="text" id="err-counter" value="0" readOnly /><br />
                    </div>

                    <div>

                        <label for="ovr-counter">Ovr counter:</label>
                        <input type="text" id="ovr-counter" value="0" readOnly /><br />
                    </div>
                </div>
            </div>   
    );
}

export default EachModule;