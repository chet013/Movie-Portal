import React from 'react';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
// import { useUser } from '../../app/context';
import { Loader } from '../../Components/loader';
import { MovieCard } from '../../Components/movie-card';
import Searchfild from '../../Components/serch-input';
import { ErrorPage } from '../404/index'

import { useGetMoviesQuery } from '../../features/movieApiSlice';

export const Home = () => {
    const navigate = useNavigate();
    const { data, error, isLoading } = useGetMoviesQuery();

    const handleSearch = (word) => {
        console.log('Searching for:', word);
    };

    if (error) {
        return <ErrorPage />;
    }

    const handleNavigate = (movieId) => {
        navigate(`/movie/${movieId}`);
        console.log(data)
    };

    return (
        <div className={styles.home}>
            {isLoading ? (
                <Loader />
            ) : (
                <div className={styles.movieList}>

                    <h1>Movies</h1>
                    <Searchfild onSearch={handleSearch} />
                    {data?.Search.map((movie) => (
                        <button
                            key={movie.imdbID}
                            className={styles.movieButton}
                            onClick={() => handleNavigate(movie.imdbID)}
                        >
                            <MovieCard
                                className={styles.movieItem}
                                poster={movie.Poster}
                                title={movie.Title}
                                year={movie.Year}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};