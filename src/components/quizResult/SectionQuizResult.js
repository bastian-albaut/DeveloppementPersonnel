import React from 'react';
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material';

import result from '../../assets/result/listResult';
import descriptions from '../../assets/result/listDescription';

import CircularProgressWithLabel from './CircularProgressWithLabel';

import styles from "../../styles/components/quizResult/sectionQuizResult.module.scss"

export default function SectionQuizResult() {

    return(
        <Box id={styles.boxSection}>
            <Typography id={styles.typoTitle} variant="h1" color="initial">Résultat</Typography>
            <Box id={styles.boxSubSection}>
                {result.scores.map((score, index) => {
                    return (
                        <Box id={styles.boxResult} key={index}>
                            <Box id={styles.boxSubResult}>
                                <CircularProgressWithLabel value={score.score}/>
                                <Typography id={styles.typoCategorieName} variant="h3" color="initial">{score.categorie_name}</Typography>
                            </Box>
                            <Typography id={styles.typoCategorieDescription} variant="body1" color="initial">{descriptions[index]}</Typography>
                        </Box>
                    )
                })}

            </Box>
        </Box>
    )
}