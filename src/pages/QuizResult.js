import React, { useContext, useEffect, useState } from "react";

import styles from "../styles/pages/quizResult.module.scss"
import Appbar from "../components/general/Appbar";
import SectionQuizResult from "../components/quizResult/SectionQuizResult";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/currentUserToken";
import Typography from '@mui/material/Typography'
import Loading from "../components/general/Loading";

import { getResult, getAllCategories } from "../api";
import RefuseAccess from "../components/general/RefuseAccess";

export default function QuizResult() {

    /* Check if the user is login on mount */
    const navigate = useNavigate();
    const {currentUser, isLoading, getToken } = useContext(CurrentUserContext);

    // Get result id from url
    const url = window.location.href;
    const resultId = url.substring(url.lastIndexOf('/') + 1);

    const [currentResult, setCurrentResult] = useState(null);
    const [allCategories, setAllCategories] = useState(null);

    useEffect(() => {
        // Get result from database by id 
        const fetchResult = async () => {
            const result = await getResult(resultId);
            if(result && result.data) {
                setCurrentResult(result.data);
            } else {
                navigate('/');
            }
        }

        // Get all categories from database
        const fetchAllCategories = async () => {
            const categories = await getAllCategories();
            if(categories && categories.data) {
                setAllCategories(categories.data);
            } else {
                navigate('/');
            }
        }

        fetchResult();
        fetchAllCategories();
    }, [resultId])

    const [resultWithCategory, setResultWithCategory] = useState(null);

    const createResultWithCategoryNameAndDescription = () => {
        if (currentResult && allCategories) {
            const updatedScores = currentResult.score.map((score) => {
                const category = allCategories.find((category) => category._id === score.categorie_id);
                const description = category.descriptions.find((description) => description.min <= score.percentage && description.max >= score.percentage);

                // Return the modified score object with added categoryName and description properties
                return {...score, category_name: category.name, description: description.description,
                };
            });

            // Update the resultWithCategory with the updated score objects
            setResultWithCategory({...currentResult,score: updatedScores});
        }
    };

    useEffect(() => {
        if(currentResult && allCategories) createResultWithCategoryNameAndDescription();
    }, [currentResult, allCategories])

    // Display loading screen on mount
    if (isLoading || !currentResult || !allCategories || !resultWithCategory) {
        return (
            <Loading />
        );
    } 

    // Refuse access if not logged in or if professional
    if(!currentUser || !getToken() || currentUser.isProfessional) {
        return (
            <RefuseAccess />
        );
    }

    return(
        <>
            <Appbar currentUser={currentUser}/>
            <SectionQuizResult result={resultWithCategory}/>
        </>
    )
}