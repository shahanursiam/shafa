import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn, getUser } from '../uits/auth';

const ProtectedRoute = ({ children, adminOnly, sellerOnly }) => {
    const loggedIn = isLoggedIn();
    const user = getUser();

    if (!loggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && user?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    if (sellerOnly && (user?.role !== 'seller' && user?.role !== 'admin')) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
