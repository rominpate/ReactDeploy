import { useState, useRef } from 'react';

// Imported  styles:
import '../styles/Led.css';

// Imported  component:

function Led(props){


    return ( 
        <div class="led" style={props.ledStyle}>

        </div>
    )

}

export default Led;