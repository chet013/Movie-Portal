import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);
    const [favoritesMoviesIds, setFavoritesMoviesIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDarkTheme, setIsDarkTheme] = useState(false)

    const toggleFavorite = (movieId) => {
        setFavoritesMoviesIds((prevFavorites) => {
            const updatedFavorites = prevFavorites.includes(movieId)
                ? prevFavorites.filter((id) => id !== movieId)
                : [...prevFavorites, movieId];
            const storedData = JSON.parse(localStorage.getItem('moviPortal')) || { users: [] };
            const updatedUsers = storedData.users.map((u) =>
                u.login === user ? { ...u, favoritesMoviesIds: updatedFavorites } : u
            );

            localStorage.setItem('moviPortal', JSON.stringify({ users: updatedUsers }));
            localStorage.setItem('current-user', JSON.stringify({
                login: user,
                isAuthorized: true,
                favoritesMoviesIds: updatedFavorites,
            }));

            return updatedFavorites;
        });
    };

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('current-user'));

        if (currentUser?.isAuthorized) {
            setUser(currentUser.login);
            setAuthorized(true);
            setFavoritesMoviesIds(currentUser.favoritesMoviesIds || []);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (user) {
            const storedData = JSON.parse(localStorage.getItem('moviPortal')) || { users: [] };
            const foundUser = storedData.users.find((u) => u.login === user);

            setFavoritesMoviesIds(foundUser?.favoritesMoviesIds || []);
        }
    }, [user]);

    useEffect(() => {
        if (user && authorized) {
            const currentUser = {
                login: user,
                isAuthorized: true,
                favoritesMoviesIds: favoritesMoviesIds,
            };
            localStorage.setItem('current-user', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('current-user');
        }
    }, [user, authorized, favoritesMoviesIds]);

    return (
        <UserContext.Provider
            value={{
                loading,
                user,
                setUser,
                authorized,
                setAuthorized,
                favoritesMoviesIds,
                setFavoritesMoviesIds,
                toggleFavorite,
                isDarkTheme,
                setIsDarkTheme,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);