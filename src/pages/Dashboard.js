import React, { useEffect, useState } from "react";
import SectionArticles from "../components/dashboard/sectionArticles";
import SectionTips from "../components/dashboard/sectionTips";
import Appbar from "../components/general/Appbar";
import { Box } from "@mui/material";

import styles from "../styles/pages/dashboard.module.scss"
import SectionQuote from "../components/dashboard/sectionQuote";

import CurrentUserContext from "../contexts/currentUserToken";
import Loading from "../components/general/Loading";
import RefuseAccess from "../components/general/RefuseAccess";
import { getUser } from "../api";

export default function Dashboard() {

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

    // Refuse access if not logged in or if professional
    if(!currentUser || !getToken() || currentUser.isProfessional) {
        return (
            <RefuseAccess />
        );
    }

    return (
        <>
            <Appbar currentUser={currentUser} />
            <Box id={styles.generalBox}>
                <SectionQuote />
                <SectionArticles currentUser={currentUser}/>
                <SectionTips />
            </Box>
        </>
    );
}