import React, { useEffect, useState } from 'react';
import ContentCreateArticle from '../components/article/ContentCreateArticle';
import Appbar from '../components/general/Appbar';
import FormCreateArticle from '../components/article/FormCreateArticle';
import Loading from '../components/general/Loading';
import RefuseAccess from '../components/general/RefuseAccess';
import { getUser } from '../api';

const ArticleCreate = () => {

    const [informationsFilled, setInformationsFilled] = useState(false);
    const [formData, setFormData] = useState({ title: "", description: "", categorie_id :"",  category_name: "", date: Date.now(), author_id: "", author_name: "", picture: "", content: ""});

    /* Check if the user is login on mount */
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    };

    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const token = getToken();

            if(!token) {
                setCurrentUser(null);
                setIsLoading(false);
                return;
            }

            if(token) {
                try {
                    const user = await getUser(token);
                    if (user) {
                        setCurrentUser(user.data);
                        setFormData({...formData, author_id: user.data._id, author_name: user.data.name});
                    }
                } catch (error) {
                    setCurrentUser(null);
                    if(error.response.status === 401) {
                        localStorage.removeItem('token');
                    }
                }
            }
        };
        fetchData();
    }, []);

    // Wait for the user to be set to change the loading state
    useEffect(() => {
        if(currentUser) {
            setIsLoading(false);
        }
    }, [currentUser])

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
