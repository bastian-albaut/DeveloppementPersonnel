import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

import styles from "../../styles/components/quizResult/circularProgressWithLabel.module.scss"

export default function CircularProgressWithLabel(props) {
  return (
    <Box id={styles.boxCircularProgress}>
      <CircularProgress variant="determinate" {...props} size={100}/>
      <Box id={styles.boxTextCircularProgress}>
        <Typography id={styles.typoTextCircularProgress} variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
