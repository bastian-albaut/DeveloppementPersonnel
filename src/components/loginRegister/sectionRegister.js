import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import FileInput from "./FileInput";
import styles from "../../styles/components/loginRegister/sectionRegister.module.scss"
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Register(props) {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (file) => {
        setSelectedFile(file);
        // Process the selected file here, e.g. upload it to a server or save it to a database
    };

    // Visibility password
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return (
        <Box id={styles.boxSection}>
            <Typography id={styles.typoTitle} variant="h2">Créer un compte</Typography>
            <form id={styles.boxFormRegister}>
                <TextField id={styles.textFieldPseudonym} label="Pseudo" variant="standard" margin="dense" required />
                <TextField id={styles.textFieldMail} label="Adresse mail" variant="standard" margin="dense" required />
                <TextField id={styles.textFieldPassword} label="Mot de passe" variant="standard" margin="dense" required type={showPassword ? "text" : "password"} InputProps={{ // <-- This is where the toggle button is added.
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
                
                <FileInput onFileSelect={handleFileSelect}/>
                <Button id={styles.buttonSubmit} variant="contained" color="primary" type="submit">S'inscrire</Button>
                <Button variant="text" color="secondary" onClick={(e) => props.setHaveAccount(true)}>J'ai déjà un compte</Button>
            </form>
        </Box>

    )
}