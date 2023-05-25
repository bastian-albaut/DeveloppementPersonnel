import React, { useContext, useEffect, useState } from 'react';
import Appbar from '../components/general/Appbar';
import SectionQuiz from '../components/quiz/SectionQuiz';
import { motion, AnimatePresence } from 'framer-motion';

import styles from "../styles/pages/quiz.module.scss"
import ProgresBar from '../components/quiz/ProgressBar';
import { useNavigate } from 'react-router-dom';
import { getQuiz, getUser } from '../api';
import { Box, CircularProgress } from '@mui/material';
import CurrentUserContext from '../contexts/currentUserToken';
import Loading from '../components/general/Loading';
import RefuseAccess from '../components/general/RefuseAccess';

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
        // Addition of all percentage of each categorie of resultQuiz into another array
        const resultAdditionate = [];
        resultQuiz.forEach((result) => {
            // If categorie_id already exist in resultAdditionate, add percentage to the percentage already present
            if(resultAdditionate.some((resultAdd) => resultAdd.categorie_id === result.categorie_id)) {
                const index = resultAdditionate.findIndex((resultAdd) => resultAdd.categorie_id === result.categorie_id);
                resultAdditionate[index].percentage += result.percentage;
            } else {
                resultAdditionate.push({ categorie_id: result.categorie_id, percentage: result.percentage });
            }
        })
        
        // Create the object to persist to the result collection in database
        const resultQuizToPersist = {};
        resultQuizToPersist.score = resultAdditionate;
        
        // Navigate to the login page with the result of the quiz
        navigate(`/login`, { state: { resultQuiz: resultQuizToPersist } });

    }

    // Change orientation of animation motion
    const [orientationAnimation, setOrientationAnimation] = useState("right");
    const [directionUpdated, setDirectionUpdated] = useState(false);

    useEffect(() => {
      setDirectionUpdated(false);
    }, [currentQuiz])

    const [resultQuiz, setResultQuiz] = useState([])

    /* Check if the user is login on mount */
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    };

    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const token = getToken();

            if(!token) {
                setCurrentUser(null);
                setIsLoading(false);
                return;
            }

            if(token) {
                try {
                    const user = await getUser(token);
                    if (user) {
                        setCurrentUser(user.data);
                    }
                } catch (error) {
                    setCurrentUser(null);
                    if(error.response.status === 401) {
                        localStorage.removeItem('token');
                    }
                }
            }
        };
        fetchData();
    }, []);

    // Wait for the user to be set to change the loading state
    useEffect(() => {
        if(currentUser) {
            setIsLoading(false);
        }
    }, [currentUser])

    // Display loading screen on mount
    if (isLoading) {
        return (
            <Loading />
        );
    } 

    // Refuse access if logged in or if professional
    if(currentUser || getToken() || currentUser?.isProfessional) {
        return (
            <RefuseAccess />
        );
    }


    if (isLoading) {
        return (
            <Loading />
        );
    } 

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
                        <SectionQuiz setResultQuiz={setResultQuiz} data={quizData[currentQuiz]} handlePreviousQuiz={handlePreviousQuiz} handleNextQuiz={handleNextQuiz} displayIconBack={displayIconBack}/>
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
