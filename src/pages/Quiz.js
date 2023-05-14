import React, { useContext, useEffect, useState } from 'react';
import Appbar from '../components/general/Appbar';
import SectionQuiz from '../components/quiz/SectionQuiz';
import { motion, AnimatePresence } from 'framer-motion';

import styles from "../styles/pages/quiz.module.scss"
import ProgresBar from '../components/quiz/ProgressBar';
import { useNavigate } from 'react-router-dom';
import { getQuiz } from '../api';
import { Box, CircularProgress } from '@mui/material';
import TokenContext from '../contexts/contextToken';

export default function Quiz() {
  
  // Shuffle array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
    
  // Get data from API
  const [quizData, setQuizData] = useState([]);
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quiz = await getQuiz();
        if(quiz && quiz.data) {
          setQuizData(shuffleArray(quiz.data))
        }
      } catch (error) {
          console.log(error)
      }
    }

    fetchQuiz();
  },[])

    // Display or not button to go to previous question
    const [displayIconBack, setDisplayIconBack] = useState(false);

    // Handle go to next question and previous question
    const [currentQuiz, setCurrentQuiz] = useState(0);

    const handleNextQuiz = () => {
      if(currentQuiz + 1 === quizData.length) {
        handleEndQuiz();
        return;
      }

      if(currentQuiz < quizData.length-1) {
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
      navigate("/login");
    }

    // Change orientation of animation motion
    const [orientationAnimation, setOrientationAnimation] = useState("right");
    const [directionUpdated, setDirectionUpdated] = useState(false);

    useEffect(() => {
      setDirectionUpdated(false);
    }, [currentQuiz])


    // Check if the user is login on mount
    const [isConnected, setIsConnected] = useState(false);
    const getToken = useContext(TokenContext);
    useEffect(() => {
        setIsConnected(getToken());
    },[getToken])


    if(isConnected) {
      navigate('/quiz/result/resultid');
    } else {
      return(
          <>
              <Appbar />
              { quizData.length > 0 ? (
                <>
                <ProgresBar valueProgress={currentQuiz * (100 / quizData.length)}/>
                  <AnimatePresence mode="wait" id={styles.animatePresence} key={orientationAnimation}>
                      <motion.div
                          key={currentQuiz}
                          initial={{ opacity: 0, x: orientationAnimation==="right" ? 300 : -300 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: orientationAnimation==="right" ? -300 : 300 }}
                          transition={{ duration: directionUpdated ? 0.6 : 0.3 }}
                          id={styles.motionDiv}
                          >
                          <SectionQuiz data={quizData[currentQuiz]} handlePreviousQuiz={handlePreviousQuiz} handleNextQuiz={handleNextQuiz} displayIconBack={displayIconBack}/>
                      </motion.div>
                  </AnimatePresence>
                </>
              ) : (
                <Box id={styles.boxCircularProgress}>
                  <CircularProgress id={styles.circularProgress}/>
                </Box>
              )}
          </>
      );
    }
}
