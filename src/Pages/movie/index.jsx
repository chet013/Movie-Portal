import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from '../../Components/loader';
import styles from './index.module.css';

const API_KEY = 'acdfa7c6'

export const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
                const data = await response.json();
                if (data.Response === 'True') {
                    setMovie(data);
                } else {
                    setError(data.Error);
                }
            } catch (err) {
                setError('Failed to fetch movie data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    if (error) {
        return <p className={styles.error}>{error}</p>;
    }

    return (
        <div className={styles.movie}>
            {
                isLoading ?
                    <Loader className={styles.loader} /> :
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
                                <p>Director:{movie.Director}</p>
                                <p>Actors: {movie.Actors}</p>
                                <div className={styles.managWrapper}>
                                    <p>Add to favorites</p>
                                    <button>
                                        🖤
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>
    );
};
