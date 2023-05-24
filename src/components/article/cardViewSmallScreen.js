import { Box, Card, Typography } from "@mui/material";
import React from "react";
import styles from "../../styles/components/article/cardViewSmallScreen.module.scss";
import { useNavigate } from "react-router-dom";

export default function CardView(props) {
    const navigate = useNavigate();
    return(
        <>
            <Box id={styles.card} onClick={() => navigate(`/article/${props.id}`)}>
                <img onDragStart={props.onDragStart} id={styles.image} alt={props.title} src={props.picture}/>
                <Box id={styles.boxSectionTypo}>
                    <Box id={styles.boxSubSectionTypo}>
                        <Typography id={styles.typoCategorie} variant="body2" color="initial">{props.categorie_name}</Typography>
                        <Typography id={styles.typoTitle} variant="h6" color="black">{props.title}</Typography>
                    </Box>
                    <Typography variant="body1" color="initial">{props.displayDate(props.date)}</Typography>
                </Box>
            </Box>
        </>
    )
}