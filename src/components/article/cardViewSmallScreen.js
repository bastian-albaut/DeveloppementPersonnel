import { Card, Typography } from "@mui/material";
import React from "react";
import styles from "../../styles/components/article/cardViewSmallScreen.module.scss";

export default function CardView(props) {
    return(
        <Card id={styles.card}>
            <img onDragStart={props.onDragStart} id={styles.image} alt={props.title} src={props.picture}/>
            <Typography id={styles.typoCategorie} variant="body2" color="initial">{props.categorie_name}</Typography>
            <Typography id={styles.typoTitle} variant="body1" color="black">{props.title}</Typography>
        </Card>
    )
}