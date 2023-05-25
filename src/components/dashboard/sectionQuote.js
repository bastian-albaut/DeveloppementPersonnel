import React, { useEffect, useState } from "react";
import styles from "../../styles/components/dashboard/sectionQuote.module.scss"
import Typography from '@mui/material/Typography'
import { Box } from "@mui/material";
import { getRandomQuote } from "../../api";
import Loading from "../general/Loading";

export default function SectionQuote() {

    // Fetch a random quoteFromApi from the API
    const [quoteFromApi, setQuoteFromApi] = useState(null);
    useEffect(() => {
        const fetchQuote = async () => {
            // Check if the quoteFromApi is already in the localStorage and if it's not expired
            const quoteFromLocalStorage = localStorage.getItem('quote');
            const quoteDateFromLocalStorage = localStorage.getItem('quoteDate');
            if(quoteFromLocalStorage && quoteDateFromLocalStorage) {
                const quoteDate = new Date(quoteDateFromLocalStorage);
                const now = new Date();
                const diff = Math.abs(now - quoteDate);
                const diffHours = Math.ceil(diff / (1000 * 60 * 60));
                if(diffHours < 24) {
                    setQuoteFromApi(JSON.parse(quoteFromLocalStorage));
                    return;
                }
            }
            try {
                const quoteFromApi = await getRandomQuote();
                if(quoteFromApi && quoteFromApi.data) {
                    setQuoteFromApi(quoteFromApi.data);
                    // Persist the quoteFromApi in the localStorage with a 24h expiration
                    localStorage.setItem('quote', JSON.stringify(quoteFromApi.data));
                    localStorage.setItem('quoteDate', new Date());
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchQuote();
    }, []);

    if(!quoteFromApi) {
        return <Loading />
    }

    return(
        <Box id={styles.boxSection}>
            <Typography id={styles.typoTitle} variant="h3" color="initial">Citation du jour</Typography>
            <Typography id={styles.typoQuote} variant="caption" color="initial">{quoteFromApi.content}</Typography>
            <Box id={styles.boxAuthor}>
                <Typography id={styles.typoAuthor} variant="body1" color="initial">{quoteFromApi.author}</Typography>
            </Box>
        </Box>
    )
}