import React, { useContext, useEffect, useState } from "react";

import styles from "../styles/pages/quizResult.module.scss"
import Appbar from "../components/general/Appbar";
import SectionQuizResult from "../components/quizResult/SectionQuizResult";
import { useNavigate } from "react-router-dom";
import TokenContext from "../contexts/contextToken";

export default function QuizResult() {

    // Check if the user is login on mount
    const navigate = useNavigate();
    const [isConnected, setIsConnected] = useState(false);
    const getToken = useContext(TokenContext);
    useEffect(() => {
        setIsConnected(getToken());
    },[getToken])


    if(!isConnected) {
        navigate('/login');
    } else {
        return(
            <>
            <Appbar />
            <SectionQuizResult />
            </>
        )
    }
}