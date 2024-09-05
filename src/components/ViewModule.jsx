import React, { useState, useEffect } from 'react';

// Imported  styles:
import '../styles/ViewModule.css';

// Imported  component:
import EachModule    from   './EachModule';

function ViewModule({firstRow, secondAndThirdRows, undisplayModule}) {

    return (
        <div className="view-module">
            <div className="row">
                {firstRow.map((box, index) => {
                    // Ensure box is in the correct format for rendering
                    {/* console.log("Rendering box: ", box); */}
                    return (
                        <div key={index} className="box">
                            <EachModule key={index} id={index + 1} moduleName={box} closeModule={undisplayModule}/>
                        </div>
                    );
                })}
            </div>

            <div className="row">
                {secondAndThirdRows.slice(0, 5).map((box, index) => {
                    // Log each box before rendering
                    {/* console.log("Rendering box: ", box); */}
                    return (
                        <div key={index} className="box">
                            <EachModule key={index} id={index + 1} moduleName={box} closeModule={undisplayModule}/>
                        </div>
                    );
                })}
            </div>

            <div className="row">
                {secondAndThirdRows.slice(5, 10).map((box, index) => {
                    {/* console.log("Rendering box: ", box); */}
                    return (
                        <div key={index} className="box">
                            <EachModule key={index} id={index + 6} moduleName={box} closeModule={undisplayModule}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ViewModule;