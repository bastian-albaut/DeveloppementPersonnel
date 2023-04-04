import React from "react";

import styles from "../../styles/components/general/appbar.module.scss"
import { AppBar, Button, Icon, IconButton, Toolbar, Typography } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from "react-router-dom";

export default function Appbar() {

    const navigate = useNavigate();

    const handleBackHomepage = () => {
        navigate("/");
    }

    return(
        <AppBar position="sticky">
            <Toolbar id={styles.toolbar}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleBackHomepage}
                >
                    <ChevronLeftIcon id={styles.backIcon}/>
                </IconButton>
                <Typography id={styles.typoTitle} variant="h6" component="div">
                    Développement Personnel
                </Typography>
                <Button id={styles.buttonLogin} variant="text" color="inherit"><Typography color="inherit">Connexion</Typography></Button>
            </Toolbar>
        </AppBar>
    )
}