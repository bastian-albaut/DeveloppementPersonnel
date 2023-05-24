import React, { useContext, useEffect, useState } from 'react';
import ContentCreateArticle from '../components/article/ContentCreateArticle';
import Appbar from '../components/general/Appbar';
import Typography from '@mui/material/Typography'
import FormCreateArticle from '../components/article/FormCreateArticle';
import Loading from '../components/general/Loading';
import { useNavigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/currentUserToken';

const ArticleCreate = () => {

    const [informationsFilled, setInformationsFilled] = useState(false);
    const [formData, setFormData] = useState({ title: "", description: "", categorie_id :"",  category_name: "", date: Date.now(), author_id: "", author_name: ''});

    useEffect(() => {
        console.log("formDataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(formData);
    }, [formData])

    /* Check if the user is login on mount */
    const navigate = useNavigate();
    const {currentUser, isLoading, getToken } = useContext(CurrentUserContext);
    const [isInitialRender, setIsInitialRender] = useState(true); // Flag for initial render
    // On mount check if a token is present
    useEffect(() => {
        if(!getToken()) {
            navigate('/login');
        }
    }, [])
    // After loading check if a user is present
    useEffect(() => {
        if(isInitialRender) {
            setIsInitialRender(false);
            return;
        }
        if(!currentUser) {
            navigate('/login');
        }
        console.log("currentUser");
        console.log(currentUser);
    }, [currentUser])
    
    if (isLoading) {
        return (
            <Loading />
        );
    } 

    if (!currentUser) {
        return null; // Render nothing until currentUser is set
    }

  return (
    <>
        <Appbar currentUser={currentUser}/>
        {currentUser ? (
            !informationsFilled ? (
                <FormCreateArticle setInformationsFilled={setInformationsFilled} formData={formData} setFormData={setFormData}/>
                ) : (
                <ContentCreateArticle currentUser={currentUser} formData={formData} setFormData={setFormData}/>
            )
        ) : (
            null
        )}
    </>
  );
};

export default ArticleCreate;
