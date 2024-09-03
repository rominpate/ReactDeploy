import { useState, useRef } from 'react';

// Imported  styles:
import '../styles/ViewModule.css';

// Imported  component:
import EachModule from './EachModule';

function ViewModule({ firstRow, secondAndThirdRows }){

    return (
        <div className="view-module">
            <div className="row">
                {firstRow.map((box, index) => {
                    if (box) {
                        return (<div className='box'>{box}</div>)
                    }
                })}
            </div>
            <div className="row">
                {secondAndThirdRows.slice(0, 5).map((box, index) => {
                    if (box) {
                        return (<div className='box'>{box}</div>)
                    }
                })}
            </div>
            <div className="row">
                {secondAndThirdRows.slice(5, 10).map((box, index) => {
                    if (box) {
                        return (<div className='box'>{box}</div>)
                    }
                })}
            </div>
        </div>
    );

}

export default ViewModule;