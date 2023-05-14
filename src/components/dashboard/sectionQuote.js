import React from "react";
import styles from "../../styles/components/dashboard/sectionQuote.module.scss"
import Typography from '@mui/material/Typography'
import { Box } from "@mui/material";
import listQuotes from "../../assets/quote/listQuotes"

const getRandomCitation = () => {
    const randomIndex = Math.floor(Math.random() * listQuotes.length);
    return listQuotes[randomIndex];
}

export default function SectionQuote() {

    const quote = getRandomCitation();

    return(
        <Box id={styles.boxSection}>
            <Typography id={styles.typoTitle} variant="h3" color="initial">Citation du jour</Typography>
            <Typography id={styles.typoQuote} variant="caption" color="initial">{quote.content}</Typography>
            <Box id={styles.boxAuthor}>
                <Typography id={styles.typoAuthor} variant="body1" color="initial">{quote.author}</Typography>
            </Box>
        </Box>
    )
}