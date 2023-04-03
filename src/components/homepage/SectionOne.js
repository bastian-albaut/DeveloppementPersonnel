import { Box, Typography, Button } from "@mui/material"
import "../../styles/components/homepage/sectionOne.scss"
import illustration from "../../assets/homepage/undraw_in_progress_re_m1l6.svg"

export default function SectionOne() {
    
    return(
        <>
            <Box id="sectionOne">
                <Typography id="typoLogo" variant="h3" color="initial">Développement Personnel</Typography>
                <Box id="subSection">
                    <Box id="subSectionLeft">
                        <Box id="boxTitle">
                            <Typography variant="h1" color="initial">Lorem Ipsum Dolor Sit Amet</Typography>
                        </Box>
                        <Box id="boxSubtitle">
                            <Typography variant="h2" color="initial">Lorem Ipsum Dolor Sit Amet</Typography>

                        </Box>
                        <Box id="boxButton">
                            <Box id="boxButton2">
                                <Button className="containedButton button" variant="contained" color="primary">
                                    Commencer
                                </Button>
                                <Button className="outlinedButton button" variant="outlined" color="primary">
                                    J'ai déjà un compte
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box id="subSectionRight">
                        <img className="illustration" alt="Illustration d'une progression" src={illustration} />
                    </Box>
                </Box>
            </Box>
        
        </>
    )
}