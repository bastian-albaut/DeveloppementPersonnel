import React, { useState } from "react";

import styles from "../../styles/components/general/appbar.module.scss"
import ToolbarConnected from "./ToolbarConnected";
import ToolbarDisconnected from "./ToolbarDisconnected";



export default function Appbar() {

    const [isConnected, setIsConnected] = useState(false);

    return(
        <>
        {isConnected ? <ToolbarConnected /> : <ToolbarDisconnected />}  
        </>
    )
}