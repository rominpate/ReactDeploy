import { useState, useRef } from 'react';

// Imported  styles:
import '../styles/EachModule.css';

// Imported  component:



function EachModule({ moduleName }) {

    let [class1, class2, class3]= ['CAN Channel 1', 'CAN Channel 2', 'CAN Channel 3', 'CAN Channel 4'].includes(moduleName) ? 
                                ['each-can-module', 'can-module-name', 'can-module-info' ] : 
                                ['each-other-module', 'other-module-name', 'other-module-info' ];


    return (
            <div id='eachModule' className={class1} >
                <h4 className={class2}>{moduleName}</h4>
                <img src="./info.svg" alt="" />
                <span>X</span>
                <div className={class3}>
                    <div>
                        <label for="status">Status:</label>
                        <input type="text" id="status" value="Running" readonly/><br />
                    </div>
                    
                    <div>
                        <label for="rx-counter">RX counter:</label>
                        <input type="text" id="rx-counter" value="1" readonly/><br />
                    </div>


                    <div>
                        <label for="tx-counter">TX counter:</label>
                        <input type="text" id="tx-counter" value="1416" readonly /><br />
                    </div>



                    <div>
                        <label for="err-counter">Err counter:</label>
                        <input type="text" id="err-counter" value="0" readonly /><br />
                    </div>

                    <div>
                        <label for="ovr-counter">Ovr counter:</label>
                        <input type="text" id="ovr-counter" value="0" readonly /><br />
                    </div>
                </div>
            </div>   
    );
}

export default EachModule;
