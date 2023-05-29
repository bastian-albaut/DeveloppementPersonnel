import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import styles from "../../styles/components/tip/cardViewWideScreen.module.scss";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export default function CardView(props) {

    const [isVote, setIsVote] = React.useState(false);
    const [customScore, setCustomScore] = React.useState(props.score);
    const increaseScore = () => {
        setIsVote(true);
        setCustomScore(props.score + 1);
        props.setCustomMessage('Vote enregistré !')
    }

    const decreaseScore = () => {
        setIsVote(true);
        setCustomScore(props.score - 1);
        props.setCustomMessage('Vote enregistré !')
    }

    return(
        <Card id={styles.card}>
            <Box id={styles.boxSection}>
                <Typography id={styles.typoContent} variant="body2" color="initial">{props.content}</Typography>
                <Box id={styles.boxSubSection}>
                    <Typography id={styles.typoScore} variant="body1" color="black">Score: {customScore}</Typography>
                    <Box id={styles.boxThumb}>
                        <Button disabled={isVote} id={styles.buttonThumbUp} onClick={increaseScore}><ThumbUpIcon id={styles.thumbUpIcon}/></Button>
                        <Button disabled={isVote} id={styles.buttonThumbUp} onClick={decreaseScore}><ThumbDownIcon id={styles.thumbDownIcon}/></Button>
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}