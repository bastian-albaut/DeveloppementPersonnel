import { Box, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import illustration from "../../assets/refuseAccess/undraw_into_the_night_vumi.svg";
import styles from "../../styles/components/general/refuseAccess.module.scss";
import Appbar from "./Appbar";
import CurrentUserContext from "../../contexts/currentUserToken";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const RefuseAccess = () => {

    const navigate = useNavigate();
    const handleBackSite = () => {
        navigate('/');
    }

    /* Check if the user is login on mount */
    const {currentUser, isLoading, getToken } = useContext(CurrentUserContext);

    // Display loading screen on mount
    if (isLoading) {
        return (
            <Loading />
        );
    } 

    return (
        <>
            <Appbar currentUser={currentUser} />
            <Box id={styles.boxSection}>
                <Box id={styles.boxSectionText}>
                    <Typography variant="h3" color="initial">Oups, vous faites fausse route...</Typography>
                    <Typography id={styles.typoDescription} variant="body1" color="initial">Pendant cette courte pause, accordez-vous un moment pour respirer, pratiquer l'auto-réflexion et réaligner votre énergie.</Typography>
                    <Button variant="outlined" color="primary" onClick={handleBackSite}>Retour au site</Button>
                </Box>
                <Box id={styles.boxSectionImage}>
                    <Box id={styles.boxUpSectionImage}>
                    </Box>
                    <img className={styles.illustration} alt="Illustration d'une progression" src={illustration} />
                </Box>
            </Box>
        </>
    );
}

export default RefuseAccess;