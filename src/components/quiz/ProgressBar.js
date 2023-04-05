import React from "react";
import { Box, LinearProgress } from "@mui/material";
import styles from "../../styles/components/quiz/progressBar.module.scss";

export default function ProgresBar(props) {
    return (
        <Box>
            <LinearProgress id={styles.progress} variant="determinate" value={props.valueProgress} color="secondary"/>
        </Box>
    )
}