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

  useEffect(() => {
    
    const fetchData = async () => {
      const token = getToken();
      if(token) {
        try {
          const user = await getUser(token);
          if (user) {
            setCurrentUser(user.data);
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
    <CurrentUserContext.Provider value={{ currentUser, isLoading, getToken }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;