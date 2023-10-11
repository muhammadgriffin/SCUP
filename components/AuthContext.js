// AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAnonymous, setIsAnonymous] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isAnonymous, setIsAnonymous }}>
            {children}
        </AuthContext.Provider>
    );
};
