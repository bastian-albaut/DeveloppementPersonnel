import { Box, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import styles from "../../styles/components/quiz/sectionQuiz.module.scss"


export default function SectionQuiz(props) {

    const [currentIndexActiveButton, setCurrentIndexActiveButton] = useState(null)

    const handleActiveButton = (index) => {
        setCurrentIndexActiveButton(index);
    }

    return (
        <Box id={styles.sectionQuiz}>
            <Box id={styles.sectionQuestion}>
                <Typography id={styles.typoQuestion} variant="h1" color="initial">{props.data.question}</Typography>
            </Box>
            <Box id={styles.sectionAnswers}>
                {props.data.answers.map((answer, index) => (
                    <Button className={styles.buttonAnswer}  variant={currentIndexActiveButton === index ? "contained" : "outlined"} color="primary" onClick={() => handleActiveButton(index) }>{answer.text}</Button>
                ))}
            </Box>
            <Box id={styles.sectionButton}>
                <Button {...(currentIndexActiveButton === null && {disabled: true})} variant="contained" size="large" color="primary" onClick={props.handleNextQuiz}>Suivant</Button>
            </Box>
        </Box>
    )
}