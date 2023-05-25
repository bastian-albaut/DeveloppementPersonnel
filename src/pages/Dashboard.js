import React, { useContext } from "react";
import SectionArticles from "../components/dashboard/sectionArticles";
import SectionTips from "../components/dashboard/sectionTips";
import Appbar from "../components/general/Appbar";
import { Box } from "@mui/material";

import styles from "../styles/pages/dashboard.module.scss"
import SectionQuote from "../components/dashboard/sectionQuote";

import CurrentUserContext from "../contexts/currentUserToken";
import Loading from "../components/general/Loading";
import RefuseAccess from "../components/general/RefuseAccess";

export default function Dashboard() {

    /* Check if the user is login on mount */
    const {currentUser, isLoading, getToken } = useContext(CurrentUserContext);
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