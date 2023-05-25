import React, { useEffect, useRef, useState } from 'react';

import { scrollIntoView } from "seamless-scroll-polyfill";

import SectionOne from '../components/homepage/SectionOne';
import SectionTwo from '../components/homepage/sectionTwo';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../components/general/Loading';
import { getUser } from '../api';
import AlertComponent from '../components/general/Alert';

export default function HomePage() {
    
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

    // Button "Commencer"
    const refBegin = useRef(null);
    const scrollBegin = () => {
        scrollIntoView(refBegin.current, {behavior : "smooth"});
        window.history.pushState(null, null, '#fonctionnement'); // Add a "#fonctionnement" to the URL
    }

    useEffect(() => {
        if (window.location.hash === '#fonctionnement') {
            scrollBegin();
        }
    }, []);

    // Navigate to the login page
    const navigate = useNavigate();
    const handleNavigateLogin = () => {
        navigate('/login');
    }

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

    return(
        <>
            {message && <AlertComponent message={message} severity="success" />}
            <SectionOne scrollBegin={scrollBegin} handleNavigateLogin={handleNavigateLogin}/>
            <SectionTwo refBegin={refBegin} handleNavigateLogin={handleNavigateLogin}/>
        </>
    );
}
