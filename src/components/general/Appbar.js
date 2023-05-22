import React, { useContext, useEffect, useState } from "react";

import styles from "../../styles/components/general/appbar.module.scss"
import ToolbarConnected from "./ToolbarConnected";
import ToolbarDisconnected from "./ToolbarDisconnected";
import CurrentUserContext from "../../contexts/currentUserToken";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";


export default function Appbar() {

    /* Check if the user is login on mount */
    const {currentUser, isLoading, getToken } = useContext(CurrentUserContext);

    if (isLoading) {
        return (
            <CircularProgress />
        );
    } 

    return(
        <>
        {currentUser ? <ToolbarConnected /> : <ToolbarDisconnected />}  
        </>
    )
}