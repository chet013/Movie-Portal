import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import { Loader } from '../../Components/loader';
import { useGetFilmQuery } from '../../api/movieApiSlice';
import styles from './index.module.css';
import { useState, useEffect } from 'react';

export const Movie = () => {
    const navigate = useNavigate()

    const { id } = useParams();
    const { data, error, isLoading } = useGetFilmQuery(id);

    const movie = data;

    const currentUser = JSON.parse(localStorage.getItem('current-user'));
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        // Проверяем, является ли фильм избранным при загрузке компонента
        if (currentUser && currentUser.favoritesMoviesIds?.includes(id)) {
            setIsFavorite(true);
        }
    }, [currentUser, id]);

    const handleClickLike = () => {
        console.log(id)

        // Проверяем авторизацию пользователя
        if (!currentUser || !currentUser.isAuthorized) {
            navigate('/login', { replace: true }); // Перенаправляем на логин, если не авторизован
            return;
        }

        // Получаем всех пользователей
        const storedData = JSON.parse(localStorage.getItem('moviPortal')) || { users: [] };
        const { users } = storedData;

        // Ищем текущего пользователя
        const userIndex = users.findIndex((user) => user.login === currentUser.login);
        if (userIndex === -1) {

            return;
        }

        // Локальная копия избранных фильмов пользователя
        let updatedFavorites = [...users[userIndex].favoritesMoviesIds];

        if (isFavorite) {
            // Удаляем фильм из избранного
            updatedFavorites = updatedFavorites.filter((movieId) => movieId !== id);
        } else {
            // Добавляем фильм в избранное
            updatedFavorites.push(id);
        }

        // Обновляем данные пользователя
        users[userIndex].favoritesMoviesIds = updatedFavorites;
        localStorage.setItem('moviPortal', JSON.stringify({ users }));

        // Обновляем текущего пользователя
        const updatedUser = { ...currentUser, favoritesMoviesIds: updatedFavorites };
        localStorage.setItem('current-user', JSON.stringify(updatedUser));

        // Обновляем локальное состояние
        setIsFavorite(!isFavorite);
    };

    if (error) {
        return <p className={styles.error}>{error}</p>;
    }

    return (
        <div className={styles.movie}>
            {isLoading ? (
                <Loader className={styles.loader} />
            ) : (
                <>
                    <div className={styles.movieDetails}>
                        <div className={styles.titleWrapper}>
                            <h1>{movie.Title}</h1>
                            <img src={movie.Poster} alt={movie.Title} className={styles.poster} />
                        </div>
                        <div className={styles.descriptionWrapper}>
                            <p>Year: {movie.Year}</p>
                            <p>Genre: {movie.Genre}</p>
                            <p>Plot: {movie.Plot}</p>
                            <p>Director: {movie.Director}</p>
                            <p>Actors: {movie.Actors}</p>
                            <div className={styles.managWrapper}>
                                <p>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</p>
                                <button
                                    onClick={handleClickLike}
                                    style={{ color: isFavorite ? 'red ' : 'black' }}
                                >
                                    {isFavorite ? '🖤' : '❤️'}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};