import React, { useEffect, useState } from "react";
import Login from "../components/loginRegister/sectionLogin";
import Register from "../components/loginRegister/sectionRegister";
import Appbar from "../components/general/Appbar";
import { Alert, Box, Typography } from "@mui/material";

import styles from "../styles/pages/loginRegister.module.scss";

export default function LoginRegister() {

    const [haveAccount, setHaveAccount] = useState(false);

    const [error, setError] = useState('');

    const handleShowError = (msg) => {
        setError(msg)
        setTimeout(() => {
            setError('')
        }, 5000)
    }

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