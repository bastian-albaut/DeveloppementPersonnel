import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import CardViewWideScreen from "../article/cardViewWideScreen";
import CardViewSmallScreen from "../article/cardViewSmallScreen";
import articles from "../../assets/article/listArticles";
import styles from "../../styles/components/dashboard/sectionArticles.module.scss"
import { getAllArticles, getResultId } from "../../api";
import Loading from "../general/Loading";
import { useNavigate } from "react-router-dom";

export default function SectionArticles(props) {

    // Fetch articles and result of the current user from API
    const [articles, setArticles] = useState(null);
    const [result, setResult] = useState(null);
    useEffect(() => {
        const fetchArticles = async () => {
            const resultat = await getAllArticles();
            if(resultat && resultat.data) {
                setArticles(resultat.data);
                console.log(resultat.data);
            }
        }

        const fetchResult = async () => {
            const resultat = await getResultId(props.currentUser._id);
            if(resultat && resultat.data) {
                setResult(resultat.data);
                console.log(resultat.data);
            }
        }


        fetchArticles();
        fetchResult();
    }, []);

    const [articlesByResult, setArticlesByResult] = useState(null);

    const getArticlesByResult = () => {
        if(articles && result) {
            // Get the three minimum percentage of score of the result
            const threeMinScore = result.score.sort((a, b) => a.percentage - b.percentage).slice(0, 3);
            console.log(threeMinScore);

            // Get the articles that have the same categorie_id as the three minimum percentage of score of the result
            const articlesByResult = articles.filter(article => threeMinScore.some(score => score.categorie_id === article.categorie_id));
            console.log(articlesByResult);
            
            // Keep only the five articles more recent
            const fiveArticlesByResult = articlesByResult.sort((a, b) => b.date - a.date).slice(0, 5);
            console.log(fiveArticlesByResult);

            setArticlesByResult(fiveArticlesByResult);
        }
    }

    useEffect(() => {
        getArticlesByResult();
    }, [articles, result])

    useEffect(() => {
        console.log(articlesByResult);
    }, [articlesByResult])

    const responsive = {
        0: { items: 1 },
        768: { items: 2 },
        992: { items: 3 },
        1200: { items: 4 },
    };

    const handleDragStart = (e) => e.preventDefault();

    const displayDate = (date) => {
        const dateArticle = new Date(date);
        const dateNow = new Date();
        const diff = dateNow - dateArticle;
        const diffInHours = Math.floor(diff / (1000 * 60 * 60));
        const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        if(diffInDays > 0) {
            return `Le ${dateArticle.toLocaleString('fr-FR', {dateStyle: 'long', timeStyle: 'short'})}`;
        } else {
            if(diffInHours === 0) {
                return `Il y a moins d'une heure`;
            } else if(diffInHours === 1) {
                return `Il y a ${diffInHours} heure`;
            } else {
                return `Il y a ${diffInHours} heures`;
            }
        }
    }
    
    const navigate = useNavigate();
    const items1 = articlesByResult ? (
        articlesByResult.map((article, index) => (
          <CardViewWideScreen
            id={article._id}
            key={index}
            title={article.title}
            picture="https://picsum.photos/500/300"
            categorie_name={article.categorie_name}
            date={article.date}
            onDragStart={handleDragStart}
            displayDate={displayDate}
          />
        ))
    ) : null;
      
    const items2 = articlesByResult ? (
        articlesByResult.map((article, index) => (
          <CardViewSmallScreen
            id={article._id}
            key={index}
            title={article.title}
            picture="https://picsum.photos/500/300"
            categorie_name={article.categorie_name}
            date={article.date}
            onDragStart={handleDragStart}
            displayDate={displayDate}
            onClick={() => navigate(`/article/${article._id}`)}
          />
        ))
    ) : null;

      const [windowSize, setWindowSize] = useState(window.innerWidth)

      const handleResize = () => {
        setWindowSize(window.innerWidth)
      }

      useEffect(() => {
          window.addEventListener('resize', handleResize)
          return () => window.removeEventListener('resize', handleResize)
      }, [])


    if(!items1 && !items2) {
        return <Loading/>
    }

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
              {items2.map((item, index) => (
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