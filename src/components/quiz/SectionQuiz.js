import { Box, Typography, Button, Icon } from "@mui/material";
import React, { useState } from "react";
import styles from "../../styles/components/quiz/sectionQuiz.module.scss"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function SectionQuiz(props) {

    // Disable button "suivant" before selection of answer
    const [currentIndexActiveButton, setCurrentIndexActiveButton] = useState(null)
    const handleActiveButton = (index) => {
        setCurrentIndexActiveButton(index);
    }

    // Search last space before "?" and replace space by "&nbsp;"
    const replaceLastSpace = (str) => {
        const index = str.lastIndexOf(" ");
        return str.substring(0, index) + "\u00A0" + str.substring(index + 1);
    }

    const handleSubmit = () => {
        // Set categorie_id and pourcentage in resultQuiz
        props.setResultQuiz((prevResult) => [...prevResult, { percentage: props.data.answers[currentIndexActiveButton].percentage, categorie_id: props.data.categorie_id }]);
        
        // Go to next question
        props.handleNextQuiz();
    }

    return (
        <Box id={styles.sectionQuiz}>
            <Box id={styles.sectionQuestion}>
                <Typography id={styles.typoQuestion} variant="h4" color="text.primary">{replaceLastSpace(props.data.question)}</Typography>
            </Box>
            <Box id={styles.sectionAnswers}>
                {props.data.answers.map((answer, index) => (
                    <Button key={index} className={styles.buttonAnswer}  variant={currentIndexActiveButton === index ? "contained" : "outlined"} color="primary" onClick={() => handleActiveButton(index) }>{answer.text}</Button>
                ))}
            </Box>
            <Box id={styles.sectionButton}>
                <Button {...(currentIndexActiveButton === null && {disabled: true})} variant="contained" size="large" color="primary" onClick={handleSubmit}>Suivant</Button>
            </Box>
            {props.displayIconBack && (
                <ChevronLeftIcon id={styles.iconBackQuestion} onClick={props.handlePreviousQuiz}/>
            )}
        </Box>
    )
}