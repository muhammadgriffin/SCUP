import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAnonymous, setIsAnonymous] = useState(false);

    const logout = () => {
        // Add any additional logic for logging out if necessary, e.g. clearing tokens, etc.

        setIsAuthenticated(false);
        setIsAnonymous(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isAnonymous, setIsAnonymous, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
