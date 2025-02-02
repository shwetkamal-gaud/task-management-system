
import { useAuth } from '../hooks/useAuth';

import { Navigate } from 'react-router';
import React from 'react';

interface Prop {
    children: React.ReactNode
}

const AuthenticatedRoute = ({ children }: Prop) => {
    const { data: user, isLoading } = useAuth();
    
    if (isLoading) return <p>Loading...</p>
    if (!user) {
        return <Navigate to={'/login'} />;
    }

    return <>{children}</>;
}

export default AuthenticatedRoute