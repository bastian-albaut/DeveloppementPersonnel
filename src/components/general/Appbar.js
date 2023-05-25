import React from "react";

import ToolbarConnected from "./ToolbarConnected";
import ToolbarDisconnected from "./ToolbarDisconnected";


export default function Appbar(props) {

    return(
        <>
        {props.currentUser ? <ToolbarConnected currentUser={props.currentUser}/> : <ToolbarDisconnected />}  
        </>
    )
}