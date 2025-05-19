import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from '../Components/ScrollToTop/ScrollToTop';
import GlobalLoader from '../Components/Loader/Loader';
import Navbar from '../Components/Header/Navbar';
import Footer from '../Components/Footer/Footer';


const HomeLayout = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            <div className='sticky top-0 z-10'>
              <Navbar></Navbar>
            </div>
            <ScrollToTop />
            {isLoading ? (
                <GlobalLoader />
            ) : (
                <div>
                    <Outlet />
                </div>
            )}
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default HomeLayout;
