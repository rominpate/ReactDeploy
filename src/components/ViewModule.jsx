import React, { useState, useEffect } from 'react';

// Imported  styles:
import '../styles/ViewModule.css';

// Imported  component:
import EachModule    from   './EachModule';

function ViewModule({firstRow, secondAndThirdRows, undisplayModule, dataFromDevice}) {

    return (
        <div className="view-module">
            <div className="row">
                {firstRow.map((box, index) => {
                    return (
                        <div key={index} className="box">
                            <EachModule key={index}  moduleName={box} closeModule={undisplayModule} dataFromDevice={dataFromDevice}/>
                        </div>
                    );
                })}
            </div>

            <div className="row">
                {secondAndThirdRows.slice(0, 5).map((box, index) => {
                    return (
                        <div key={index} className="box">
                            <EachModule key={index}  moduleName={box} closeModule={undisplayModule} dataFromDevice={dataFromDevice}/>
                        </div>
                    );
                })}
            </div>

            <div className="row">
                {secondAndThirdRows.slice(5, 10).map((box, index) => {
                    return (
                        <div key={index} className="box">
                            <EachModule key={index}  moduleName={box} closeModule={undisplayModule} dataFromDevice={dataFromDevice}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ViewModule;
