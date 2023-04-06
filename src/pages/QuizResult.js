import React from "react";
import Typography from '@mui/material/Typography'
import { Box } from "@mui/material";

import styles from "../styles/pages/quizResult.module.scss"
import Appbar from "../components/general/Appbar";
import SectionQuizResult from "../components/quizResult/SectionQuizResult";

export default function QuizResult() {

    return(
        <>
        <Appbar />
        <SectionQuizResult />
        </>
    )
}