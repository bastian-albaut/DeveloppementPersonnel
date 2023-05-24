import { Box, Card, Typography } from "@mui/material";
import React from "react";
import styles from "../../styles/components/article/cardViewWideScreen.module.scss";

export default function CardView(props) {
    return(
        <Card id={styles.card}>
            <img onDragStart={props.onDragStart} id={styles.image} alt={props.title} src={props.picture}/>
            <Box id={styles.boxSection}>
                <Typography id={styles.typoCategorie} variant="body2" color="initial">{props.categorie_name}</Typography>
                <Typography id={styles.typoTitle} variant="h6" color="black">{props.title}</Typography>
                <Typography id={styles.typoDescription} variant="body1" color="initial">{props.displayDate(props.date)}</Typography>
            </Box>
        </Card>
    )
}