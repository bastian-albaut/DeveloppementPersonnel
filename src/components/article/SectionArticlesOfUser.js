import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Delete from '@mui/icons-material/Delete';
import styles from "../../styles/components/article/sectionArticlesOfUser.module.scss";
import { useNavigate } from "react-router-dom";
import { deleteArticle } from "../../api";
import AlertComponent from "../general/Alert";

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

    // Display alert message
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState(null);
    useEffect(() => {
        if(message) {
            setTimeout(() => {
                setMessage('');
                setSeverity(null);
            }, 4000)
        }
    }, [message])

    const handleDelete = async (id) => {
        const result = await deleteArticle(id);
        if(result && result.data) {
            console.log(result.data);
            props.setArticles(props.articles.filter((article) => article._id !== id));
            setMessage("L'article a bien été supprimé.");
            setSeverity("success");
        } else {
            setMessage("Une erreur est survenue lors de la suppression de l'article.");
            setSeverity("error");
        }
    }

    if(props.articles.length === 0) {
        return (
            <>
                <Typography id={styles.typoTitlePage} variant="h4" color="initial">Mes articles</Typography>
                <Typography variant="h6" color="initial">Vous n'avez pas encore écrit d'article...</Typography>
            </>
        );
    }

    return (
        <>
        {message && <AlertComponent message={message} severity={severity} />}
        <Typography id={styles.typoTitlePage} variant="h4" color="initial">Mes articles</Typography>
            {props.articles.map((article) => (
                <Box key={article._id} id={styles.card} onClick={() => navigate(`/article/${article._id}`)}>
                    <img id={styles.image} alt={props.title} src={article.picture}/>
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