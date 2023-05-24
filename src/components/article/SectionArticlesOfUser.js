import React from "react";
import { Box, Typography } from "@mui/material";
import Delete from '@mui/icons-material/Delete';
import styles from "../../styles/components/article/sectionArticlesOfUser.module.scss";
import { useNavigate } from "react-router-dom";
import { deleteArticle } from "../../api";

const SectionArticlesOfUser = (props) => {

    const displayDate = (date) => {
        const dateArticle = new Date(date);
        const dateNow = new Date();
        const diff = dateNow - dateArticle;
        const diffInHours = Math.floor(diff / (1000 * 60 * 60));
        const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        if(diffInDays > 0) {
            return `Le ${dateArticle.toLocaleString('fr-FR', {dateStyle: 'long', timeStyle: 'short'})}`;
        } else {
            if(diffInHours === 0) {
                return `Il y a moins d'une heure`;
            } else if(diffInHours === 1) {
                return `Il y a ${diffInHours} heure`;
            } else {
                return `Il y a ${diffInHours} heures`;
            }
        }
    }

    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const result = await deleteArticle(id);
        if(result && result.data) {
            console.log(result.data);
            props.setArticles(props.articles.filter((article) => article._id !== id));
        }
    }

    if(props.articles.length === 0) {
        return (
            <>
                <Typography id={styles.typoTitlePage} variant="h3" color="initial">Mes articles</Typography>
                <Typography variant="h6" color="initial">Vous n'avez pas encore écrit d'article...</Typography>
            </>
        );
    }

    return (
        <>
        <Typography id={styles.typoTitlePage} variant="h3" color="initial">Mes articles</Typography>
            {props.articles.map((article) => (
                <Box key={article._id} id={styles.card} onClick={() => navigate(`/article/${article._id}`)}>
                    <img id={styles.image} alt={props.title} src="https://picsum.photos/800/300"/>
                    <Box id={styles.boxSectionTypo}>
                        <Box id={styles.boxSubSectionTypo}>
                            <Typography id={styles.typoCategorie} variant="body2" color="initial">{article.categorie_name}</Typography>
                            <Typography id={styles.typoTitle} variant="h6" color="black">{article.title}</Typography>
                        </Box>
                        <Typography variant="body1" color="initial">{displayDate(article.date)}</Typography>
                    </Box>
                    <Box id={styles.boxDeleteIcon}>
                        <Delete id={styles.deleteIcon} onClick={(event) => {event.stopPropagation(); handleDelete(article._id)}} />
                    </Box>
                </Box>
            ))}
        </>
    );
}

export default SectionArticlesOfUser;