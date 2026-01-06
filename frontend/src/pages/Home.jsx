import React from 'react';

import HeroSection from '../components/HeroSection';
import BestSelling from '../components/BestSellingProduct';
import PromotionPage from '../components/PromotionPage';
import OurProduct from '../components/OurProduct';
import Featured from '../components/Featured';
import Service from '../components/Service';

const Home = () => {
    
       
    return (
        <div>
            
            <HeroSection />
            <BestSelling />
            <PromotionPage />
            <OurProduct />
            <Featured />
            <Service />
            
        </div>
    );
};

export default Home;