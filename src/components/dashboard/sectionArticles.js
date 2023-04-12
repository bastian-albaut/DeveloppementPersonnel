import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import CardViewWideScreen from "../article/cardViewWideScreen";
import CardViewSmallScreen from "../article/cardViewSmallScreen";
import articles from "../../assets/article/listArticles";
import styles from "../../styles/components/dashboard/sectionArticles.module.scss"

export default function SectionArticles() {
    const responsive = {
        0: { items: 1 },
        768: { items: 2 },
        992: { items: 3 },
        1200: { items: 4 },
    };

    const handleDragStart = (e) => e.preventDefault();
    
    const items1 = articles.map((article, index) => (
        <CardViewWideScreen 
          key={index}
          title={article.title}
          description={article.description}
          picture={article.picture}
          date={article.date}
          content={article.content}
          categorie_id={article.categorie_id}
          categorie_name={article.categorie_name}
          professional_id={article.professional_id}
          professional_firstname={article.professional_firstname}
          professional_lastname={article.professional_lastname}
          onDragStart={handleDragStart}
        />
      ));

      const items2 = articles.map((article, index) => (
        <CardViewSmallScreen
          key={index}
          title={article.title}
          description={article.description}
          picture={article.picture}
          date={article.date}
          content={article.content}
          categorie_id={article.categorie_id}
          categorie_name={article.categorie_name}
          professional_id={article.professional_id}
          professional_firstname={article.professional_firstname}
          professional_lastname={article.professional_lastname}
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
            <Typography id={styles.typoTitle} variant="h3" color="initial">Sélection d'articles pour moi:</Typography>
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