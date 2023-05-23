import { Box, Card, Typography } from '@mui/material';
import React from 'react';

import styles from "../../styles/components/quizResult/cardResult.module.scss"
import CircularProgressWithLabel from './CircularProgressWithLabel.js';

export default function CardResult(props) {
    // console.log(props.score.category_name)
    return (
        <Card key={props.index} id={styles.cardResult}>
            <Box id={styles.boxSubResult}>
                <CircularProgressWithLabel value={props.score.percentage}/>
                <Typography id={styles.typoCategorieName} variant="h3" color="text.primary">{props.score.category_name}</Typography>
            </Box>
            <Typography id={styles.typoCategorieDescription} variant="body1" color="text.primary">{props.score.description}</Typography>
        </Card>
    )
}