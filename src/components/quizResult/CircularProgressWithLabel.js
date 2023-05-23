import { Box, CircularProgress, Typography, useMediaQuery } from "@mui/material";
import React from "react";

import styles from "../../styles/components/quizResult/circularProgressWithLabel.module.scss"

export default function CircularProgressWithLabel(props) {

    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    const circularProgressSize = isSmallScreen ? 70 : 100; // Define the size based on the media query

    return (
        <Box id={styles.boxCircularProgress}>
            <CircularProgress id={styles.circularProgress} variant="determinate" {...props} size={circularProgressSize}/>
                <Box id={styles.boxTextCircularProgress}>
                    <Typography id={styles.typoTextCircularProgress} variant="caption" component="div" color="text.primary">
                    {`${Math.round(props.value)}%`}
                    </Typography>
            </Box>
        </Box>
    );
}
