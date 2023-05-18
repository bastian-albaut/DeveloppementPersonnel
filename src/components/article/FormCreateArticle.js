import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "../../styles/components/article/formCreateArticle.module.scss"

const FormCreateArticle = (props) => {

    return (
        <Box id={styles.boxSection}>
            <Typography id={styles.typoTitle} variant="h4">Créer un article</Typography>
            <TextField className={styles.textField} label="Titre" variant="standard" margin="dense" required onChange={(e) => props.setFormData({...props.formData, title: e.target.value})}/>
            <TextField className={styles.textField} multiline rows={3} label="Description" variant="standard" margin="dense" required onChange={(e) => props.setFormData({...props.formData, description: e.target.value})}/>
            <TextField className={styles.textField} label="Catégorie" variant="standard" margin="dense" required onChange={(e) => props.setFormData({...props.formData, category: e.target.value})}/>
            <Box id={styles.boxButton}>
                <Button id={styles.button} variant="contained" color="primary" onClick={props.setInformationsFilled}>Rédiger l'article</Button>
            </Box>
        </Box>
    );
}

export default FormCreateArticle;