import React from 'react';
import Banner from '../../Components/Header/Banner';
import CTA from '../../Components/Extra/CTA';
import Feedback from '../../Components/Feedback/Feedback';
import Faq from '../../Components/FAQ/Faq';
import HowItWork from '../../Components/HowItWorks/HowItWork';




const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <CTA></CTA>
            <HowItWork></HowItWork>
            <Faq></Faq>
            <Feedback></Feedback>
            
        </div>
    );
};

export default Home;