import React, { useContext, useEffect, useState } from "react";
import { getArticlesById, getUser } from "../api";
import Loading from "../components/general/Loading";
import Appbar from "../components/general/Appbar";
import { useNavigate } from "react-router-dom";
import SectionArticlesOfUser from "../components/article/SectionArticlesOfUser";
import CurrentUserContext from "../contexts/currentUserToken";
import RefuseAccess from "../components/general/RefuseAccess";


const ArticlesOfUser = () => {

    // Get id of user from url
    const url = window.location.href;
    const userId = url.substring(url.lastIndexOf('/') + 1);

    // Fetch all articles of the user from API
    const [articles, setArticles] = useState(null);
    useEffect(() => {
        const fetchArticles = async () => {
            const resultat = await getArticlesById(userId);
            if(resultat && resultat.data) {
                setArticles(resultat.data);
                console.log(resultat.data);
            }
        }

        fetchArticles();
    }, []);


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
    if (isLoading || !articles) {
        return (
            <Loading />
        );
    } 

    // Refuse access if not logged in or if not professional
    if(!currentUser || !getToken() || !currentUser.isProfessional) {
        return (
            <RefuseAccess />
        );
    }

    return( 
        <>
            <Appbar currentUser={currentUser} />
            <SectionArticlesOfUser articles={articles} setArticles={setArticles}/>
        </>
    );
}

export default ArticlesOfUser;