import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    // Восстановление данных пользователя из localStorage при загрузке приложения
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('current-user'));
        if (currentUser?.isAuthorized) {
            setUser(currentUser.login);
            setAuthorized(true);
        }
    }, []);

    // Автоматическое сохранение данных в localStorage при изменении user или authorized
    useEffect(() => {
        if (user && authorized) {
            localStorage.setItem(
                'current-user',
                JSON.stringify({ login: user, isAuthorized: true })
            );
        } else {
            localStorage.removeItem('current-user'); // Удаляем данные, если пользователь не авторизован
        }
    }, [user, authorized]);

    return (
        <UserContext.Provider value={{ user, setUser, authorized, setAuthorized }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);