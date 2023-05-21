import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileInput from "./FileInput";
import styles from "../../styles/components/loginRegister/sectionRegister.module.scss"
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { register } from "../../api";

export default function Register(props) {

    const [formData, setFormData] = useState({pseudonym: '', mail: '', password: '', file: ''});

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        console.log(formData);
    }, [formData])

    const handleFileSelect = (file) => {
        setSelectedFile(file);
        setFormData({...formData, file: file})
        // Process the selected file here, e.g. upload it to a server or save it to a database
    };

    const navigate = useNavigate();

    const setToken = (userToken) => {
        localStorage.setItem('token', JSON.stringify(userToken));
        navigate("/quiz/result/resultid");
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

        
        try {
            const res = await register(formData);
            if(res && res.data) {
                console.log("test");
                // setToken(res.data.token)
            }
        } catch(error) {
            if(error.code === "ERR_NETWORK") {
                props.handleShowError("Erreur: Serveur inaccessible.");
            } else {
                props.handleShowError("Erreur: Certains champs ne sont pas correctement remplis.");
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