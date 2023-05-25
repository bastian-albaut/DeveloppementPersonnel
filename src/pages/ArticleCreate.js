import React, { useContext, useEffect, useState } from 'react';
import ContentCreateArticle from '../components/article/ContentCreateArticle';
import Appbar from '../components/general/Appbar';
import FormCreateArticle from '../components/article/FormCreateArticle';
import Loading from '../components/general/Loading';
import CurrentUserContext from '../contexts/currentUserToken';
import RefuseAccess from '../components/general/RefuseAccess';

const ArticleCreate = () => {

    const [informationsFilled, setInformationsFilled] = useState(false);
    const [formData, setFormData] = useState({ title: "", description: "", categorie_id :"",  category_name: "", date: Date.now(), author_id: "", author_name: ''});

    useEffect(() => {
        console.log("formDataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(formData);
    }, [formData])

    /* Check if the user is login on mount */
    const {currentUser, isLoading, getToken } = useContext(CurrentUserContext);

    // Display loading screen on mount
    if (isLoading) {
        return (
            <Loading />
        );
    } 

    // Refuse access if not logged in or if not professional
    if(!currentUser || !getToken() || !currentUser.isProfessional) {
        return (
            <RefuseAccess />
        );
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
