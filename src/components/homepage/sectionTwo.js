import { Box, Typography } from "@mui/material"
import "../../styles/components/homepage/sectionTwo.scss"
import illustration1 from "../../assets/homepage/undraw_questions_re_1fy7.svg"
import illustration2 from "../../assets/homepage/undraw_percentages_re_a1ao.svg"


export default function SectionTwo() {
    
    return(
        <>
            <Box id="sectionTwo">
                <Box id="boxTitle">
                    <Typography id="title" variant="h2" color="initial">Comment ça fonctionne ?</Typography>
                </Box>
                <Box id="boxSubSection">
                    <Box id="boxSubsection1">
                        <Typography variant="h4" color="initial">Vous devez répondre à 20 questions pour déterminer votre niveau de développement personnel.</Typography>
                        <img className="illustration1" alt="Illustration d'une progression" src={illustration1} />
                    </Box>
                    <Box id="boxSubsection2">
                        <Typography variant="h4" color="initial">Vous obtenez un résultat sous forme de pourcentage pour chaque aspect du développement personnel.</Typography>
                        <img className="illustration2" alt="Illustration d'une progression" src={illustration2} />
                    </Box>
                    <Typography id="typoResult" variant="h3" color="initial">Vous pourrez ensuite accéder à une sélection d'articles et d'astuces pour vous !</Typography>
                </Box>
            </Box>
        </>
    )
}