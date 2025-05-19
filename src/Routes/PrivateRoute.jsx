import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';
import GlobalLoader from '../Components/Loader/Loader';

const PrivateRoute = ({ children }) => {

    const {user , loading} = use(AuthContext);
    const location = useLocation();

    if(loading){
        return <GlobalLoader></GlobalLoader>
    }

    if(!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;