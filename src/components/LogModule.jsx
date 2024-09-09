import { useState, useRef } from 'react';

// Imported  styles:
import '../styles/LogModule.css';

// Imported  component:

function LogModule(){

    return ( 
        <div className='log-module'>
            <div>
                <p>### General(CAN Gateway Configurator) <br />
                    Write XML files to target device... <br />
                    ############ OK <br />
                    Write CONF file to target device... <br />
                    ################# OK <br />
                    0 Error(s) and 0 Warning(s) occurred. <br />
                    #### Verify (CAN Gateway Configurator V6) <br />
                    0 Error(s) and 0 Warning(s) occurred. <br />
                    #File 'D:\temp\Romin CAN@Net Config files\' <br />
                    ### General(CAN Gateway Configurator) <br />
                    Write XML files to target device... <br />
                    ############ OK <br />
                    Write CONF file to target device... <br />
                    ################# OK <br />
                    0 Error(s) and 0 Warning(s) occurred. <br />
                    #### Verify (CAN Gateway Configurator V6) <br />
                    0 Error(s) and 0 Warning(s) occurred. <br />
                    #File 'D:\temp\Romin CAN@Net Config files\' <br />
                    ### General(CAN Gateway Configurator) <br />
                    Write XML files to target device... <br />
                    ############ OK <br />
                    Write CONF file to target device... <br />
                    ################# OK <br />
                    0 Error(s) and 0 Warning(s) occurred. <br />
                    #### Verify (CAN Gateway Configurator V6) <br />
                    0 Error(s) and 0 Warning(s) occurred. <br />
                    #File 'D:\temp\Romin CAN@Net Config files\' <br />
                </p>
            </div>
        </div>
    )

}

export default LogModule;