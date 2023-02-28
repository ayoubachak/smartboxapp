import React, {createContext, useState, useEffect} from 'react';


export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    const login = ()=>{
        setToken('testing');
        setLoading(false);
    }

    const logout = ()=>{
        setToken(null);
        setLoading(true);
    }

    return (
        <AuthContext.Provider  value={{login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
