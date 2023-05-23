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
    const [formData, setFormData] = useState({ title: "", description: "", category_name: "", picture: ""});

    useEffect(() => {
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
            return;
        }
        if(!currentUser) {
            navigate('/login');
        }
        setIsInitialRender(false);
    }, [currentUser])


    if (isLoading) {
        return (
            <Loading />
        );
    } 

  return (
    <>
        <Appbar currentUser={currentUser}/>
        {!informationsFilled ? (
            <FormCreateArticle setInformationsFilled={setInformationsFilled} formData={formData} setFormData={setFormData}/>
            ) : (
            <ContentCreateArticle formData={formData}/>
        )}
    </>
  );
};

export default ArticleCreate;
