import React from "react";
import SectionArticles from "../components/dashboard/sectionArticles";
import Appbar from "../components/general/Appbar";
import { Box } from "@mui/material";

import styles from "../styles/pages/dashboard.module.scss"

export default function Dashboard() {
    return(
        <>
            <Appbar />
            <Box id={styles.generalBox}>
                <SectionArticles />
            </Box>
        </>
    )
}