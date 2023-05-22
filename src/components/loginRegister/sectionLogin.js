import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { Button, TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { login } from '../../api';
import styles from "../../styles/components/loginRegister/sectionLogin.module.scss"

export default function Login(props) {
    const [data, setData] = useState({ mail: '', password: '' });

    const navigate = useNavigate();

    const setToken = (userToken) => {
        localStorage.setItem('token', JSON.stringify(userToken));
        navigate(`/quiz/result/${props.currentUser._id}`);
    }
    
    const handleSignIn = async () => {
        if(data.mail === '' || data.password === '') {
            props.handleShowError("Veuillez entrer votre adresse mail et votre mot de passe.");
            return;
        }
        try {
            const res = await login(data);
            if(res && res.data) {
                setToken(res.data.token)
            }
        } catch(error) {
            if(error.code === "ERR_NETWORK") {
                props.handleShowError("Erreur: Serveur inaccessible.");
            } else {
                props.handleShowError("Erreur: Adresse mail ou mot de passe incorrect.");
            }
        }
    }

    // Visibility password
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return(
        <Box id={styles.sectionSignIn}>
            
            <Box id={styles.boxSection}>
                <Typography id={styles.titleSignIn} variant="h2" color="black">Se connecter</Typography>
                <Box id={styles.boxFormSignIn}>
                    <TextField label="Adresse mail" variant="standard" margin="dense" onChange={(e) => setData({...data, mail: e.target.value})}/>
                    <TextField type={showPassword ? "text" : "password"} label="Mot de passe" variant="standard" margin="dense" onChange={(e) => setData({...data, password: e.target.value})} InputProps={{ // <-- This is where the toggle button is added.
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
                                                                                                                                                                                                            }}
                                                                                                                                                                                                            />
                </Box>
                <Button id={styles.buttonLogin} variant="contained" color="primary" onClick={handleSignIn}>Connexion</Button>
                <Button variant="text" color="secondary" onClick={(e) => props.setHaveAccount(false)}>Je n'ai pas de compte</Button>
            </Box>
        </Box>
    );
}