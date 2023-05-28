import { Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../../styles/components/article/formCreateArticle.module.scss"
import { getAllCategories } from "../../api";
import { useNavigate } from "react-router-dom";
import FileInput from "../loginRegister/FileInput";
import Loading from "../general/Loading";

const FormCreateArticle = (props) => {

    // Fetch all the categories from the database
    const navigate = useNavigate();
    const [allCategories, setAllCategories] = useState(null);
    useEffect(() => {
        const fetchAllCategories = async () => {
            const categories = await getAllCategories();
            if(categories && categories.data) {
                setAllCategories(categories.data);
                props.setFormData({...props.formData, category_name: categories.data[0].name});
            } else {
                navigate('/');
            }
        }

        fetchAllCategories();
    }, [])

    const [selectedFile, setSelectedFile] = useState(null);
    
    const handleFileSelect = async (file) => {
        setSelectedFile(file);
        const base64 = await convertBase64(file);
        props.setFormData({...props.formData, picture: base64})
    };
    
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    if(!allCategories) {
        return <Loading />
    }

    return (
        <Box id={styles.boxSection}>
            <Typography id={styles.typoTitle} variant="h4">Créer un article</Typography>
            <TextField className={styles.textField} label="Titre" variant="outlined" margin="dense" required onChange={(e) => props.setFormData({...props.formData, title: e.target.value})}/>
            <TextField className={styles.textField} multiline rows={3} label="Description" variant="outlined" margin="dense" required onChange={(e) => props.setFormData({...props.formData, description: e.target.value})}/>
            <Box id={styles.boxSelect}>
                <Select
                    id={styles.select}
                    labelId={styles.labelSelect}
                    value={props.formData.category_name}
                    onChange={(e) => props.setFormData({...props.formData, category_name: e.target.value})}
                    label="Categorie"
                    variant="outlined"
                    margin="dense"
                    required
                >
                    {allCategories && allCategories.map((category) => {
                        return (
                            <MenuItem key={category._id} value={category.name}>{category.name}</MenuItem>
                        )
                    })}
                </Select>
            </Box>
            <Box id={styles.boxFileInput}>
                <FileInput selectedFile={selectedFile} handleFileSelect={handleFileSelect} />
            </Box>

            <Box id={styles.boxButton}>
                <Button id={styles.button} variant="contained" color="primary" onClick={props.setInformationsFilled}>Rédiger l'article</Button>
            </Box>
        </Box>
    );
}

export default FormCreateArticle;