import React, { useState } from 'react';
import Appbar from '../../components/general/Appbar';
import SectionQuiz from '../../components/quiz/SectionQuiz';
import { motion, AnimatePresence } from 'framer-motion';

import styles from "../../styles/pages/quiz.module.scss"

export default function Quiz() {
    
    const [currentQuiz, setCurrentQuiz] = useState(0);

    const handleNextQuiz = () => {
        setCurrentQuiz((prevQuiz) => (prevQuiz < quiz.questions.length - 1 ? prevQuiz + 1 : 0));
      };

      const quiz = {
        questions: [
          {
            question: "What is the capital of France?",
            answers: [
              { text: "London", correct: false },
              { text: "Paris", correct: true },
              { text: "Berlin", correct: false },
              { text: "Madrid", correct: false }
            ]
          },
          {
            question: "What is the largest planet in our solar system?",
            answers: [
              { text: "Jupiter", correct: true },
              { text: "Mars", correct: false },
              { text: "Venus", correct: false },
              { text: "Neptune", correct: false }
            ]
          },
          {
            question: "Who wrote the novel 'To Kill a Mockingbird'?",
            answers: [
              { text: "Harper Lee", correct: true },
              { text: "F. Scott Fitzgerald", correct: false },
              { text: "William Faulkner", correct: false },
              { text: "Ernest Hemingway", correct: false }
            ]
          }
        ]
      };
      

    return(
        <>
            <Appbar />
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
