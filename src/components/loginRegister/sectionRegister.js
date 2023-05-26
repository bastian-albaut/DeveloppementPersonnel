import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileInput from "./FileInput";
import styles from "../../styles/components/loginRegister/sectionRegister.module.scss"
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { register, postResult } from "../../api";

export default function Register(props) {

    const [formData, setFormData] = useState({pseudonym: '', mail: '', password: '', picture: ''});

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        console.log(formData);
    }, [formData])

    const handleFileSelect = async (file) => {
        setSelectedFile(file);
        const base64 = await convertBase64(file);
        setFormData({...formData, picture: base64})
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

    const navigate = useNavigate();

    const setToken = (userToken) => {
        localStorage.setItem('token', JSON.stringify(userToken));
    }

    // Visibility password
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const handleSignUp = async (event) => {
        event.preventDefault();

        if(formData.mail === '' || formData.password === '' || formData.pseudonym === '' || formData.file === '') {
            props.handleShowError("Veuillez remplir tous les champs.");
            return;
        }

        if(formData.password.length < 8) {
            props.handleShowError("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }

        if(formData.pseudonym.length < 4) {
            props.handleShowError("Le pseudo doit contenir au moins 4 caractères.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(formData.mail)) {
            props.handleShowError("L'adresse mail n'est pas valide.");
            return;
        }

        // Persist the user in the database
        let newUser = null;
        try {
            const res = await register(formData);
            if(res && res.data) {
                newUser = res.data.newUser;
                setToken(res.data.token)
            }
        } catch(error) {
            console.log(error);
            if(error.code === "ERR_NETWORK") {
                props.handleShowError("Erreur: Serveur inaccessible.");
            } else if(error.response.data.msg === "User already exist") {
                props.handleShowError("Erreur: Un utilisateur avec cette adresse mail ou ce pseudo existe déjà.");
            } else {
                props.handleShowError("Erreur: Une erreur est survenue.");
            }
        }

        console.log("newUser");
        console.log(newUser);

        if(newUser) {
            // Add newUser id in the resultQuiz
            const resultQuiz = props.resultQuiz;
            resultQuiz.user_id = newUser._id;

            // Persist the result of the quiz in the database
            try {
                const res = await postResult(resultQuiz);
                if(res && res.data) {
                    // Redirect to the result page
                    console.log("res.data");
                    console.log(res.data);
                    navigate(`/quiz/result/${res.data.result._id}`);
                }
            } catch(error) {
                console.log(error);
            }
        }

    }

    return (
        <Box id={styles.boxSection}>
            <Typography id={styles.typoTitle} variant="h2">Créer un compte</Typography>
            <form id={styles.boxFormRegister}>
                <TextField id={styles.textFieldPseudonym} onChange={(e) => setFormData({...formData, pseudonym: e.target.value})} label="Pseudo" variant="standard" margin="dense" required />
                <TextField id={styles.textFieldMail} onChange={(e) => setFormData({...formData, mail: e.target.value})} label="Adresse mail" variant="standard" margin="dense" required />
                <TextField id={styles.textFieldPassword} onChange={(e) => setFormData({...formData, password: e.target.value})} label="Mot de passe" variant="standard" margin="dense" required type={showPassword ? "text" : "password"} InputProps={{ // <-- This is where the toggle button is added.
                                                                                                                                                    endAdornment: (
                                                                                                                                                    <InputAdornment position="end">
                                                                                                                                                        <IconButton
                                                                                                                                                            aria-label="toggle password visibility"
                                                                                                                                                            onClick={handleClickShowPassword}
                                                                                                                                                            onMouseDown={handleMouseDownPassword}
                                                                                                                                                        >
                                                                                                                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                                                                                                                        </IconButton>
                                                                                                                                                    </InputAdornment>
                                                                                                                                                    )
                                                                                                                                                }}/>
                
                <FileInput selectedFile={selectedFile} handleFileSelect={handleFileSelect} />
                <Button id={styles.buttonSubmit} variant="contained" color="primary" type="submit" onClick={(event) => handleSignUp(event)}>S'inscrire</Button>
                <Button variant="text" color="secondary" onClick={(e) => props.setHaveAccount(true)}>J'ai déjà un compte</Button>
            </form>
        </Box>

    )
}