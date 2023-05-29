import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getArticlesById, getTipsById, getUser } from "../api";
import Loading from "../components/general/Loading";
import RefuseAccess from "../components/general/RefuseAccess";
import Appbar from "../components/general/Appbar";
import AlertComponent from "../components/general/Alert";
import SectionArticlesOfUser from "../components/article/SectionArticlesOfUser";
import SectionTipsOfUser from "../components/tip/SectionTipsOfUser";
import { Box } from "@mui/material";

const DashboardProfessional = () => {
    // Display alert message
    const location = useLocation();
    const [message, setMessage] = useState(location?.state?.message);
    useEffect(() => {
        if(message) {
            setTimeout(() => {
                setMessage('');
            }, 4000)
        }
    }, [message])

    // Get id of user from url
    const url = window.location.href;
    const userId = url.substring(url.lastIndexOf('/') + 1);

    const navigate = useNavigate();

    // Fetch all articles and tips of the user from API
    const [articles, setArticles] = useState(null);
    const [tips, setTips] = useState(null);
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const resultat = await getArticlesById(userId);
                if(resultat && resultat.data) {
                    setArticles(resultat.data);
                    console.log(resultat.data);
                }
            } catch (error) {
                if(error.response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/')
                }
            }
        }

        const fetchTips = async () => {
            try {
            const resultat = await getTipsById(userId);
            if(resultat && resultat.data) {
                setTips(resultat.data);
                console.log(resultat.data);
            }
            } catch (error) {
                if(error.response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/')
                }
            }
        }
        
        fetchArticles();
        fetchTips();
    }, []);

    useEffect(() => {
        console.log(tips)
    }, [tips])

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
    if (isLoading || !articles || !tips) {
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
            {message && <AlertComponent message={message} severity="success" />}
            <SectionArticlesOfUser articles={articles} setArticles={setArticles}/>
            <Box sx={{ height: 50 }}></Box>
            <SectionTipsOfUser currentUser={currentUser} tips={tips} setTips={setTips}/>
        </>
    );
}

export default DashboardProfessional;