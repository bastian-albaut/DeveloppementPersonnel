import { Box, Button, Typography } from "@mui/material"
import styles from "../../styles/components/homepage/sectionTwo.module.scss"
import illustration1 from "../../assets/homepage/undraw_questions_re_1fy7.svg"
import illustration2 from "../../assets/homepage/undraw_percentages_re_a1ao.svg"
import { useNavigate } from "react-router-dom"


export default function SectionTwo(props) {
    
    const navigate = useNavigate()

    const handleStartQuiz = () => {
        navigate("/quiz");
    }

    return(
        <>
            <Box id={styles.sectionTwo} ref={props.refBegin}>
                <Box id={styles.boxTitle}>
                    <Typography id={styles.title} variant="h2" color="text.primary">Comment ça fonctionne&nbsp;?</Typography>
                </Box>
                <Box id={styles.boxSubSection}>
                    <Box id={styles.boxSubsection1}>
                        <Typography className={styles.typoFunctioning} variant="h4" color="text.primary">Vous devez répondre à 20 questions pour déterminer votre niveau de développement personnel.</Typography>
                        <img className={styles.illustration1} alt="Illustration d'une progression" src={illustration1} />
                    </Box>
                    <Box id={styles.boxSubsection2}>
                        <Typography className={styles.typoFunctioning} variant="h4" color="text.primary">Vous obtenez un résultat sous forme de pourcentage pour chaque aspect du développement personnel.</Typography>
                        <img className={styles.illustration2} alt="Illustration d'une progression" src={illustration2} />
                    </Box>
                    <Box id={styles.boxButton}>
                        <Button className={styles.containedButton} variant="contained" color="primary" onClick={handleStartQuiz}>
                            Commencer le quiz !
                        </Button>
                        <Button className={styles.outlinedButton} variant="outlined" color="primary" onClick={props.handleNavigateLogin}>
                            J'ai déjà un compte
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}