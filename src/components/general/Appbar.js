import React, { useContext, useEffect, useState } from "react";

import styles from "../../styles/components/general/appbar.module.scss"
import ToolbarConnected from "./ToolbarConnected";
import ToolbarDisconnected from "./ToolbarDisconnected";
import CurrentUserContext from "../../contexts/currentUserToken";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";


export default function Appbar(props) {

    
    useEffect(() => {
        // console.log("currentUser on appbar")
        // console.log(props.currentUser)
    }, [props.currentUser])

    return(
        <>
        {props.currentUser ? <ToolbarConnected currentUser={props.currentUser}/> : <ToolbarDisconnected />}  
        </>
    )
}