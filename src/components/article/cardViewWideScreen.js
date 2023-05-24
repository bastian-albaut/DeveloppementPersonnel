import { Box, Card, Typography } from "@mui/material";
import React from "react";
import styles from "../../styles/components/article/cardViewWideScreen.module.scss";
import { useNavigate } from "react-router-dom";

export default function CardView(props) {
    const navigate = useNavigate();
    return(
        <Card id={styles.card} onDragStart={props.onDragStart} onClick={() => navigate(`/article/${props.id}`)}>
            <img id={styles.image} onDragStart={props.onDragStart} alt={props.title} src={props.picture}/>
            <Box id={styles.boxSection}>
                <Typography id={styles.typoCategorie} variant="body2" color="initial">{props.categorie_name}</Typography>
                <Typography id={styles.typoTitle} variant="h6" color="black">{props.title}</Typography>
                <Typography id={styles.typoDescription} variant="body1" color="initial">{props.displayDate(props.date)}</Typography>
            </Box>
        </Card>
    )
}