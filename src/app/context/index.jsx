import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('current-user'));
        if (currentUser && currentUser.authorized) {
            setUser(currentUser.login);
            setAuthorized(true);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, authorized, setAuthorized }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);