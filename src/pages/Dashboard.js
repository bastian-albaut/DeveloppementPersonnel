import React, { useContext, useEffect, useState } from "react";
import SectionArticles from "../components/dashboard/sectionArticles";
import SectionTips from "../components/dashboard/sectionTips";
import Appbar from "../components/general/Appbar";
import { Box } from "@mui/material";

import styles from "../styles/pages/dashboard.module.scss"
import SectionQuote from "../components/dashboard/sectionQuote";

import TokenContext from "../contexts/contextToken";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

    // Check if the user is login on mount
    const navigate = useNavigate();
    const [isConnected, setIsConnected] = useState(false);
    const getToken = useContext(TokenContext);
    useEffect(() => {
        setIsConnected(getToken());
    },[getToken])


    if(!isConnected) {
        navigate('/login');
    } else {
        return(
            <>
                <Appbar />
                <Box id={styles.generalBox}>
                    <SectionQuote />
                    <SectionArticles />
                    <SectionTips />
                </Box>
            </>
        )
    }
}