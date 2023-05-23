import React from 'react';
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material';

import descriptions from '../../assets/result/listDescription';

import CardResult from './CardResult';

import styles from "../../styles/components/quizResult/sectionQuizResult.module.scss"

export default function SectionQuizResult(props) {
    return(
        <Box id={styles.boxSection}>
            <Typography id={styles.typoTitle} variant="h1" color="initial">Résultat</Typography>
            <Typography id={styles.typoSubTitle} variant="subtitle1" color="initial">Estimation de votre niveau pour tous les apects du développement personnel.</Typography>
            <Box id={styles.boxSubSection}>
                {props.result.score.map((score, index) => {
                    return (
                        <CardResult key={index} score={score}/>
                    )
                })}
            </Box>
        </Box>
    )
}