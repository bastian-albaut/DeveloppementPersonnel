import React, { useCallback, useContext, useEffect, useState } from "react";
import Login from "../components/loginRegister/sectionLogin";
import Register from "../components/loginRegister/sectionRegister";
import Appbar from "../components/general/Appbar";
import { Alert, Box } from "@mui/material";

import styles from "../styles/pages/loginRegister.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/currentUserToken";
import Loading from "../components/general/Loading";
import { getResultId } from "../api";

export default function LoginRegister() {

    const [haveAccount, setHaveAccount] = useState(true);

    const [error, setError] = useState('');

    const handleShowError = (msg) => {
        setError(msg)
        setTimeout(() => {
            setError('')
        }, 5000)
    }

    // Get the result of the quiz from the state if the user come from the quiz page
    let resultQuiz = null;
    const location = useLocation();
    if(location.state !== null) {
        console.log("location.state.resultQuiz");
        console.log(location.state.resultQuiz);
        resultQuiz = location.state.resultQuiz;
    }

    // Get the result id correponding to the user
    const [resultId, setResultId] = useState(null);
    useEffect(() => {
        const fetchResultId = async () => {
            if(!currentUser) {
                return;
            }
            const result = await getResultId(currentUser._id);
            if(result && result.data) {
                setResultId(result.data);
            }
        }
        fetchResultId();
    }, [])

    /* Check if the user is login on mount */
    const navigate = useNavigate();
    const {currentUser, isLoading, getToken } = useContext(CurrentUserContext);
    // After loading check if a user already logged in
    useEffect(() => {
        if(currentUser && resultId) {
          navigate(`/quiz/result/${resultId}`);
        }
    }, [currentUser, resultId])

    if (isLoading) {
        return (
            <Loading />
        );
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
                <Login setHaveAccount={setHaveAccount} handleShowError={handleShowError} />
            ) : (
                <Register setHaveAccount={setHaveAccount} handleShowError={handleShowError} resultQuiz={resultQuiz} />
            )}
        </>
    );
}