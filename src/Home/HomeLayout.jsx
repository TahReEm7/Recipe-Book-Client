import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from '../Components/ScrollToTop/ScrollToTop';
import GlobalLoader from '../Components/Loader/Loader';
import Navbar from '../Components/Header/Navbar';
import Footer from '../Components/Footer/Footer';
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -10 },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.4,
};

const HomeLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>
      <ScrollToTop />

      {isLoading ? (
        <GlobalLoader />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      )}

      <Footer />
    </div>
  );
};

export default HomeLayout;

