import React, { useContext, useEffect, useState } from "react";
import { getArticle } from "../api";
import { useNavigate } from "react-router-dom";
import Loading from "../components/general/Loading";
import Appbar from "../components/general/Appbar";
import SectionDetailArticle from "../components/article/sectionDetailArticle";
import CurrentUserContext from "../contexts/currentUserToken";

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
            setIsInitialRender(false);
            return;
        }
        if(!currentUser) {
            navigate('/login');
        }
    }, [currentUser])

    if(!currentArticle || !currentUser) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <Appbar currentUser={currentUser}/>
            <SectionDetailArticle currentArticle={currentArticle} />
        </>
    );
}

export default ArticleDetail;