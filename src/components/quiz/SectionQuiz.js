import { Box, Typography, Button } from "@mui/material";
import React from "react";
import styles from "../../styles/components/quiz/sectionQuiz.module.scss"


export default function SectionQuiz(props) {
    return (
        <Box id={styles.sectionQuiz}>
            <Box id={styles.sectionQuestion}>
                <Typography id={styles.typoQuestion} variant="h1" color="initial">{props.data.question}</Typography>
            </Box>
            <Box id={styles.sectionAnswers}>
                <Box id={styles.subSectionAnswers1}>
                    <Button id={styles.buttonAnswer1} variant="outlined" color="primary">Lorem Ipsum</Button>
                    <Button id={styles.buttonAnswer2} variant="outlined" color="primary">Lorem Ipsum</Button>
                </Box>
                <Box id={styles.subSectionAnswers2}>
                    <Button id={styles.buttonAnswer3} variant="outlined" color="primary">Lorem Ipsum</Button>
                    <Button id={styles.buttonAnswer4} variant="outlined" color="primary">Lorem Ipsum</Button>
                </Box>
            </Box>
            <Box id={styles.sectionButton}>
                <Button variant="contained" size="large" color="primary" onClick={props.handleNextQuiz}>Suivant</Button>
            </Box>
        </Box>
    )
}