import React, { useContext, useEffect, useState } from "react";
import SectionArticles from "../components/dashboard/sectionArticles";
import SectionTips from "../components/dashboard/sectionTips";
import Appbar from "../components/general/Appbar";
import { Box } from "@mui/material";

import styles from "../styles/pages/dashboard.module.scss"
import SectionQuote from "../components/dashboard/sectionQuote";

import CurrentUserContext from "../contexts/currentUserToken";
import { useNavigate } from "react-router-dom";
import Loading from "../components/general/Loading";

export default function Dashboard() {

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


    if (isLoading) {
        return (
            <Loading />
        );
    } 

    if (!currentUser) {
        return null;
    }

    return (
        <>
            <Appbar currentUser={currentUser} />
            <Box id={styles.generalBox}>
                <SectionQuote />
                <SectionArticles />
                <SectionTips />
            </Box>
        </>
    );
}