import { Box, Card, Typography } from "@mui/material";
import React from "react";
import styles from "../../styles/components/tip/cardViewWideScreen.module.scss";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export default function CardView(props) {
    return(
        <Card id={styles.card}>
            <Box id={styles.boxSection}>
                <Typography id={styles.typoContent} variant="body2" color="initial">{props.content}</Typography>
                <Box id={styles.boxSubSection}>
                    <Typography id={styles.typoScore} variant="body1" color="black">Score: {props.score}</Typography>
                    <Box id={styles.boxThumb}>
                        <ThumbUpIcon id={styles.thumbUpIcon}/>
                        <ThumbDownIcon id={styles.thumbDownIcon}/>
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}