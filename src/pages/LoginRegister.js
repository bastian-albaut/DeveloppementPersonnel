import React, { useCallback, useContext, useEffect, useState } from "react";
import Login from "../components/loginRegister/sectionLogin";
import Register from "../components/loginRegister/sectionRegister";
import Appbar from "../components/general/Appbar";
import { Alert, Box } from "@mui/material";

import styles from "../styles/pages/loginRegister.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/currentUserToken";
import Loading from "../components/general/Loading";
import { getResultByUserId, getUser } from "../api";

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
        resultQuiz = location.state.resultQuiz;
    }

    // Get the result id correponding to the user
    const [resultId, setResultId] = useState(null);
    useEffect(() => {
        const fetchResultId = async () => {
            if(currentUser) {
                const result = await getResultByUserId(currentUser._id);
                if(result && result.data) {
                    setResultId(result.data._id);
                }
            }
        }
        fetchResultId();
    }, [])

    /* Check if the user is login on mount */
    const navigate = useNavigate();
    
    /* Check if the user is login on mount */
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    };

    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const token = getToken();

            if(!token) {
                setCurrentUser(null);
                setIsLoading(false);
                return;
            }

            if(token) {
                try {
                    const user = await getUser(token);
                    if (user) {
                        setCurrentUser(user.data);
                    }
                } catch (error) {
                    setCurrentUser(null);
                    if(error.response.status === 401) {
                        localStorage.removeItem('token');
                    }
                }
            }
        };
        fetchData();
    }, []);

    // Wait for the user to be set to change the loading state
    useEffect(() => {
        if(currentUser) {
            setIsLoading(false);
        }
    }, [currentUser])
    
    // After loading check if a user or a professional is already logged in
    useEffect(() => {

        if(currentUser?.isProfessional) {
            navigate(`/article/user/${currentUser._id}`);
        }

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