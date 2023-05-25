import React, { useContext, useEffect, useState } from "react";
import { getArticle, getUser } from "../api";
import { useNavigate } from "react-router-dom";
import Loading from "../components/general/Loading";
import Appbar from "../components/general/Appbar";
import SectionDetailArticle from "../components/article/sectionDetailArticle";
import CurrentUserContext from "../contexts/currentUserToken";
import RefuseAccess from "../components/general/RefuseAccess";

const ArticleDetail = () => {

    // Get the article id from the url
    const url = window.location.href;
    const articleId = url.substring(url.lastIndexOf('/') + 1);

    const navigate = useNavigate();
    const [currentArticle, setCurrentArticle] = useState(null);
    useEffect(() => {
        // Get article from database by id 
        const fetchArticle = async () => {
            const result = await getArticle(articleId);
            if(result && result.data) {
                setCurrentArticle(result.data);
            } else {
                navigate('/');
            }
        }

        fetchArticle();
    }, [])

    useEffect(() => {
        console.log(currentArticle);
    }, [currentArticle])

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
    if (isLoading || !currentArticle) {
        return (
            <Loading />
        );
    } 

    // Refuse access if not logged in
    if(!currentUser || !getToken()) {
        return (
            <RefuseAccess />
        );
    }

    return (
        <>
            <Appbar currentUser={currentUser}/>
            <SectionDetailArticle currentArticle={currentArticle} />
        </>
    );
}

export default ArticleDetail;