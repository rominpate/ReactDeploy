import { useState, useRef } from 'react';

// Imported  styles:
import '../styles/Led.css';

// Imported  component:

function Led({ledStyle}){


    return ( 
        <div className="led" style={ledStyle}>

        </div>
    )

}

export default Led;