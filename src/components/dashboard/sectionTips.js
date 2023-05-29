import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import CardViewWideScreen from "../tip/cardViewWideScreen";
import CardViewSmallScreen from "../tip/cardViewSmallScreen";
import styles from "../../styles/components/dashboard/sectionTips.module.scss"
import { getAllTips } from "../../api";


export default function SectionTips() {

    // Fetch all tips from API
    const [tips, setTips] = useState(null);
    useEffect(() => {
        const fetchTips = async () => {
            const resultat = await getAllTips();
            if(resultat && resultat.data) {
                setTips(resultat.data);
                console.log(resultat.data);
            }
        }
        
        fetchTips();
    }, []);

    const responsive = {
        0: { items: 1 },
        768: { items: 2 },
        992: { items: 3 },
        1200: { items: 4 },
    };

    const handleDragStart = (e) => e.preventDefault();
    
    const items1 = tips?.map((tip, index) => (
      <CardViewWideScreen 
        key={index}
        content={tip.content}
        score={tip.score}
        categorie_id={tip.categorie_id}
        categorie_name={tip.categorie_name}
        author_id={tip.author_id}
        author_name={tip.author_name}
        onDragStart={handleDragStart}
      />
    ));

      const items2 = tips?.map((tip, index) => (
        <CardViewSmallScreen
        key={index}
        content={tip.content}
        score={tip.score}
        categorie_id={tip.categorie_id}
        categorie_name={tip.categorie_name}
        author_id={tip.author_id}
        author_name={tip.author_name}
        onDragStart={handleDragStart}
        />
      ));

      const [windowSize, setWindowSize] = useState(window.innerWidth)

      const handleResize = () => {
        setWindowSize(window.innerWidth)
      }

      useEffect(() => {
          window.addEventListener('resize', handleResize)
          return () => window.removeEventListener('resize', handleResize)
      }, [])

    return (
        <Box id={styles.boxSection}>
            <Typography id={styles.typoTitle} variant="h3" color="initial">Sélection d'astuces pour moi:</Typography>
            {windowSize > 768 ? (
              <AliceCarousel 
                  id={styles.carousel}
                  mouseTracking 
                  items={items1} 
                  responsive={responsive}
                  autoPlay={true}
                  autoPlayInterval="1500"
                  disableButtonsControls={true}
                  disableDotsControls={true}
                  infinite={true}
                  keyboardNavigation={true}
              />
            ) : (
              <Box id={styles.boxSubSection}>
                <hr className={styles.hr}/>
              {items2.slice(0,4).map((item, index) => (
                  <div key={index}>
                    {item}
                    <hr className={styles.hr}/>
                  </div>
              ))}
              </Box> 
            )}
        </Box>
    )
}