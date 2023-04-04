import { Box, Typography, Button } from "@mui/material"
import styles from "../../styles/components/homepage/sectionOne.module.scss"
import illustration from "../../assets/homepage/undraw_in_progress_re_m1l6.svg"
import waves from "../../assets/homepage/waves.svg"

export default function SectionOne(props) {
    
    return(
        <>
            <Box id={styles.sectionOne}>
                <Typography id={styles.typoLogo} variant="h6" color="initial">Développement Personnel</Typography>
                <Box id={styles.subSection}>
                    <Box id={styles.subSectionLeft}>
                        <Box id={styles.boxTitle}>
                            <Typography id={styles.typoTitle} variant="h1" color="initial">Évoluer Ensemble : La Plateforme de Développement Personnel Collaborative</Typography>
                        </Box>
                        <Box id={styles.boxSubtitle}>
                            <Typography id={styles.typoSubtitle} variant="h2" color="initial">Trouvez votre chemin vers l'épanouissement personnel grâce à notre quiz, nos articles rédigés par des professionnels, et notre communauté bienveillante.</Typography>

                        </Box>
                        <Box id={styles.boxButton}>
                            <Box id={styles.boxButton2}>
                                <Button className={styles.containedButton} variant="contained" color="primary" onClick={props.scrollBegin}>
                                    Découvrir
                                </Button>
                                <Button className={styles.outlinedButton} variant="outlined" color="primary">
                                    J'ai déjà un compte
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box id={styles.subSectionRight}>
                        <img className={styles.illustration} alt="Illustration d'une progression" src={illustration} />
                    </Box>
                </Box>
                <img id={styles.waves} alt="Vagues" src={waves} />
            </Box>
        
        </>
    )
}