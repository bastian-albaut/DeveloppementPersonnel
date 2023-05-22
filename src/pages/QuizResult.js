import React, { useContext, useEffect, useState } from "react";

import styles from "../styles/pages/quizResult.module.scss"
import Appbar from "../components/general/Appbar";
import SectionQuizResult from "../components/quizResult/SectionQuizResult";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/currentUserToken";
import Typography from '@mui/material/Typography'
import Loading from "../components/general/Loading";

export default function QuizResult() {

    /* Check if the user is login on mount */
    const navigate = useNavigate();
    const {currentUser, isLoading, getToken } = useContext(CurrentUserContext);
    const [isInitialRender, setIsInitialRender] = useState(true); // Flag for initial render
    // On mount check if a token is present
    useEffect(() => {
        if(!getToken()) {
            navigate('/login');
        }
    }, [])
    // After loading check if a user is present
    useEffect(() => {
        if(isInitialRender) {
            return;
        }
        if(!currentUser) {
            navigate('/login');
        }
        setIsInitialRender(false);
    }, [currentUser])


    if (isLoading) {
        return (
            <Loading />
        );
    } 

    return(
        <>
            <Appbar />
            <SectionQuizResult />
        </>
    )
}