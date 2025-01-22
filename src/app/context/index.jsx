import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser, authorized, setAuthorized }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);