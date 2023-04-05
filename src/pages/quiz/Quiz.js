import React, { useState } from 'react';
import Appbar from '../../components/general/Appbar';
import SectionQuiz from '../../components/quiz/SectionQuiz';
import { motion, AnimatePresence } from 'framer-motion';

import quiz from '../../assets/quiz/listQuestions';

import styles from "../../styles/pages/quiz.module.scss"
import ProgresBar from '../../components/quiz/ProgressBar';

export default function Quiz() {
    
    const [currentQuiz, setCurrentQuiz] = useState(0);

    const handleNextQuiz = () => {
        setCurrentQuiz((prevQuiz) => (prevQuiz < quiz.questions.length - 1 ? prevQuiz + 1 : 0));
      };

    return(
        <>
            <Appbar />
            <ProgresBar valueProgress={currentQuiz * 5}/>
            <AnimatePresence mode="wait" id={styles.animatePresence}>
                <motion.div
                    key={currentQuiz}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.3 }}
                    id={styles.motionDiv}
                    >
                    <SectionQuiz data={quiz.questions[currentQuiz]} handleNextQuiz={handleNextQuiz}/>
                </motion.div>
            </AnimatePresence>
        </>
    );
}
