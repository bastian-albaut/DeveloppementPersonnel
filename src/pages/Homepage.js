import React, { useEffect, useRef } from 'react';

import { scrollIntoView } from "seamless-scroll-polyfill";

import SectionOne from '../components/homepage/SectionOne';
import SectionTwo from '../components/homepage/sectionTwo';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    
    // Button "Commencer"
    const refBegin = useRef(null);
    const scrollBegin = () => {
        scrollIntoView(refBegin.current, {behavior : "smooth"});
        window.history.pushState(null, null, '#fonctionnement'); // Add a "#fonctionnement" to the URL
    }

    useEffect(() => {
        if (window.location.hash === '#fonctionnement') {
            scrollBegin();
        }
    }, []);

    // Navigate to the login page
    const navigate = useNavigate();
    const handleNavigateLogin = () => {
        navigate('/login');
    }

    return(
        <>
            <SectionOne scrollBegin={scrollBegin} handleNavigateLogin={handleNavigateLogin}/>
            <SectionTwo refBegin={refBegin} handleNavigateLogin={handleNavigateLogin}/>
        </>
    );
}
