import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../Components/loader/Loader';
import { useGetFilmQuery } from '../../api/movieApiSlice';
import styles from './index.module.css';
import { useState, useEffect } from 'react';
import { useUser } from '../../app/context';

export default function Movie() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, error, isLoading } = useGetFilmQuery(id);
    const { authorized, toggleFavorite, isDarkTheme } = useUser();
    const movie = data;

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('current-user'));
        if (currentUser?.favoritesMoviesIds?.includes(id)) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [id, authorized]);

    const handleClickLike = () => {
        if (!authorized) {
            navigate('/login', { replace: true });
            return;
        }

        const storedData = JSON.parse(localStorage.getItem('moviPortal')) || { users: [] };
        const currentUser = JSON.parse(localStorage.getItem('current-user'));

        const users = storedData.users.map((user) => {
            if (user.login === currentUser.login) {
                const updatedFavorites = isFavorite
                    ? user.favoritesMoviesIds.filter((movieId) => movieId !== id)
                    : [...new Set([...user.favoritesMoviesIds, id])];

                return { ...user, favoritesMoviesIds: updatedFavorites };
            }
            return user;
        });

        localStorage.setItem('moviPortal', JSON.stringify({ users }));

        const updatedUser = users.find((user) => user.login === currentUser.login);
        localStorage.setItem('current-user', JSON.stringify(updatedUser));

        setIsFavorite(!isFavorite);
        toggleFavorite(id);
    };

    if (error) {
        return <p className={styles.error}>{error}</p>;
    }

    return (
        <div className={!isDarkTheme ? styles.movie : styles.movieDark}>
            {isLoading ? (
                <Loader className={styles.loader} />
            ) : (
                <>
                    <div className={!isDarkTheme ? styles.movieDetails : styles.movieDetailsDark}>
                        <div className={styles.titleWrapper}>
                            <h1>{movie.Title}</h1>
                            <img src={movie.Poster} alt={movie.Title} className={styles.poster} />
                        </div>
                        <div className={!isDarkTheme ? styles.descriptionWrapper : styles.descriptionWrapperDark}>
                            <p>Year: {movie.Year}</p>
                            <p>Genre: {movie.Genre}</p>
                            <p>Plot: {movie.Plot}</p>
                            <p>Director: {movie.Director}</p>
                            <p>Actors: {movie.Actors}</p>
                            <div className={styles.managWrapper}>
                                <p>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</p>
                                <button
                                    onClick={handleClickLike}
                                    style={{ color: isFavorite ? 'red' : 'black' }}
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