import React, { useState, useEffect } from 'react';
import { getUser } from '../api';
import CurrentUserContext from '../contexts/currentUserToken';

const CurrentUserProvider = ({ children }) => {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfessional, setIsProfessional] = useState(false);

  useEffect(() => {
    
    const fetchData = async () => {
        console.log("test1")
        const token = getToken();
        console.log("test2")
        if(token) {
            try {
            console.log("test3")
          const user = await getUser(token);
          if (user) {
            console.log("test4")

            setCurrentUser(user.data);
            console.log(user.data)
            if(user.data.isProfessional) {
                setIsProfessional(true);
            }
          }
        } catch (error) {
          setCurrentUser(null);
          if(error.response.status === 401) {
            localStorage.removeItem('token');
          }
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoading, getToken, isProfessional }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;