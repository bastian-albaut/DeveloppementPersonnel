import React, { useContext, useEffect, useState } from "react";
import { getArticlesById } from "../api";
import Loading from "../components/general/Loading";
import Appbar from "../components/general/Appbar";
import { useNavigate } from "react-router-dom";
import SectionArticlesOfUser from "../components/article/SectionArticlesOfUser";
import CurrentUserContext from "../contexts/currentUserToken";


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
    const navigate = useNavigate();
    const {currentUser, isLoading, getToken } = useContext(CurrentUserContext);
    const [isInitialRender, setIsInitialRender] = useState(true); // Flag for initial render
    // On mount check if a token is present
    useEffect(() => {
        if(!getToken()) {
            navigate('/login');
        }
    }, [])
    // After loading check if a user is present
    useEffect(() => {
        if(isInitialRender) {
            return;
        }
        if(!currentUser) {
            navigate('/login');
        }
        setIsInitialRender(false);
    }, [currentUser])


    if (isLoading || !currentUser) {
        return (
            <Loading />
        );
    } 

    if(!articles) {
        return <Loading />
    }

    return( 
        <>
            <Appbar currentUser={currentUser} />
            <SectionArticlesOfUser articles={articles} setArticles={setArticles}/>
        </>
    );
}

export default ArticlesOfUser;