import { useState, useRef } from 'react';

// Imported  styles:
import '../styles/ViewModule.css';

// Imported  component:

function ViewModule(){

    // State to keep track of the boxes in each row
     const [firstRow, setFirstRow] = useState([null, null, null, null]);
    const [secondAndThirdRows, setSecondAndThirdRows] = useState([null, null, null, null, null, null, null, null, null, null]);

    return ( 
        <div id='viewModule' className='view-module'>
            <div className="row">
                {firstRow.map((box, index) => (
                    <div key={index} className="cell">
                        1
                        {/* {box && <div className="box">{box}</div>} */}
                    </div>
                ))}
            </div>
            <div className="row">
                {secondAndThirdRows.slice(0, 5).map((box, index) => (
                    <div key={index} className="cell">
                        2
                        {/* {box && <div className="box">{box}</div>} */}
                    </div>
                ))}
            </div>
            <div className="row">
                {secondAndThirdRows.slice(5, 10).map((box, index) => (
                    <div key={index} className="cell">
                        3
                        {/* {box && <div className="box">{box}</div>} */}
                    </div>
                ))}
            </div>
        </div>
    )

}

export default ViewModule;