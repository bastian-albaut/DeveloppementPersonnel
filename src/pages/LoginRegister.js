import React, { useContext, useEffect, useState } from "react";
import Login from "../components/loginRegister/sectionLogin";
import Register from "../components/loginRegister/sectionRegister";
import Appbar from "../components/general/Appbar";
import { Alert, Box } from "@mui/material";

import styles from "../styles/pages/loginRegister.module.scss";
import { useNavigate } from "react-router-dom";
import TokenContext from "../contexts/contextToken";


export default function LoginRegister() {

    const [haveAccount, setHaveAccount] = useState(false);

    const [error, setError] = useState('');

    const handleShowError = (msg) => {
        setError(msg)
        setTimeout(() => {
            setError('')
        }, 5000)
    }

    // Check if the user is login on mount
    const navigate = useNavigate();
    const [isConnected, setIsConnected] = useState(false);
    const getToken = useContext(TokenContext);
    useEffect(() => {
        setIsConnected(getToken());
    },[getToken])


    if(isConnected) {
        navigate('/quiz/result/resultid');
    } else {
        return(
            <>
                <Appbar />
                {error ? (
                    <Box className={styles.boxAlert}>
                        <Alert className="alert" severity="error" onClose={() => {setError('')}}>{error}</Alert>
                    </Box>
                ) : (
                null
                )}
                {haveAccount ? (
                    <Login setHaveAccount={setHaveAccount} handleShowError={handleShowError}/>
                ) : (
                    <Register setHaveAccount={setHaveAccount} handleShowError={handleShowError}/>
                )}
            </>
        );
    }
}