import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Delete from '@mui/icons-material/Delete';
import styles from "../../styles/components/tip/sectionTipsOfUser.module.scss";
import { useNavigate } from "react-router-dom";
import { deleteTip } from "../../api";
import AlertComponent from "../general/Alert";

const SectionTipsOfUser = (props) => {

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
        const result = await deleteTip(id);
        if(result && result.data) {
            console.log(result.data);
            props.setTips(props.tips.filter((tip) => tip._id !== id));
            setMessage("L'astuce a bien été supprimé.");
            setSeverity("success");
        } else {
            setMessage("Une erreur est survenue lors de la suppression de l'astuce.");
            setSeverity("error");
        }
    }

    if(props.tips.length === 0) {
        return (
            <>
                <Typography id={styles.typoTitlePage} variant="h4" color="initial">Mes astuces</Typography>
                <Typography variant="h6" color="initial">Vous n'avez pas encore écrit d'astuces...</Typography>
            </>
        );
    }

    return (
        <>
        {message && <AlertComponent message={message} severity={severity} />}
        <Typography id={styles.typoTitlePage} variant="h4" color="initial">Mes astuces</Typography>
            {props.tips.map((tip) => (
                <Box key={tip._id} id={styles.card} onClick={() => navigate(`/tip/${tip._id}`)}>
                    <img id={styles.image} alt={props.title} src={tip.picture}/>
                    <Box id={styles.boxSectionTypo}>
                        <Box id={styles.boxSubSectionTypo}>
                            <Typography id={styles.typoCategorie} variant="body2" color="initial">{tip.categorie_name}</Typography>
                            <Typography id={styles.typoTitle} variant="h6" color="black">{tip.title}</Typography>
                        </Box>
                    </Box>
                    <Box id={styles.boxDeleteIcon}>
                        <Delete id={styles.deleteIcon} onClick={(event) => {event.stopPropagation(); handleDelete(tip._id)}} />
                    </Box>
                </Box>
            ))}
        </>
    );
}

export default SectionTipsOfUser;