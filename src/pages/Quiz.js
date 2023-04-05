import React, { useEffect, useState } from 'react';
import Appbar from '../components/general/Appbar';
import SectionQuiz from '../components/quiz/SectionQuiz';
import { motion, AnimatePresence } from 'framer-motion';

import quiz from '../assets/quiz/listQuestions';

import styles from "../styles/pages/quiz.module.scss"
import ProgresBar from '../components/quiz/ProgressBar';
import { useNavigate } from 'react-router-dom';

export default function Quiz() {
  
    // Display or not button to go to previous question
    const [displayIconBack, setDisplayIconBack] = useState(false);

    // Handle go to next question and previous question
    const [currentQuiz, setCurrentQuiz] = useState(0);

    const handleNextQuiz = () => {
      if(currentQuiz + 1 === quiz.questions.length) {
        handleEndQuiz();
        return;
      }

      if(currentQuiz < quiz.questions.length-1) {
        setOrientationAnimation("right");
        setCurrentQuiz((prevQuiz) => prevQuiz + 1);
        setDisplayIconBack(true);
        setDirectionUpdated(true);
      }
    };

    const handlePreviousQuiz = () => {
      if(currentQuiz === 1) {
        setDisplayIconBack(false);
      }
      if(currentQuiz > 0) {
        setOrientationAnimation("left");
        setCurrentQuiz((prevQuiz) => prevQuiz - 1);
        setDirectionUpdated(true);
      }
    }

    const navigate = useNavigate()

    const handleEndQuiz = () => {
      navigate("/quiz/result/resultid");
    }

    // Change orientation of animation motion
    const [orientationAnimation, setOrientationAnimation] = useState("right");
    const [directionUpdated, setDirectionUpdated] = useState(false);

    useEffect(() => {
      setDirectionUpdated(false);
    }, [currentQuiz])

    return(
        <>
            <Appbar />
            <ProgresBar valueProgress={currentQuiz * 5}/>
            <AnimatePresence mode="wait" id={styles.animatePresence} key={orientationAnimation}>
                <motion.div
                    key={currentQuiz}
                    initial={{ opacity: 0, x: orientationAnimation==="right" ? 300 : -300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: orientationAnimation==="right" ? -300 : 300 }}
                    transition={{ duration: directionUpdated ? 0.6 : 0.3 }}
                    id={styles.motionDiv}
                    >
                    <SectionQuiz data={quiz.questions[currentQuiz]} handlePreviousQuiz={handlePreviousQuiz} handleNextQuiz={handleNextQuiz} displayIconBack={displayIconBack}/>
                </motion.div>
            </AnimatePresence>
        </>
    );
}
