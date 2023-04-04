import React, { useEffect, useRef } from 'react';

import { scrollIntoView } from "seamless-scroll-polyfill";

import SectionOne from '../../components/homepage/SectionOne';
import SectionTwo from '../../components/homepage/sectionTwo';

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

    return(
        <>
            <SectionOne scrollBegin={scrollBegin}/>
            <SectionTwo refBegin={refBegin}/>
        </>
    );
}
