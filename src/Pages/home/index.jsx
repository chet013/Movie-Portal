import styles from './index.module.css';
import { Loader } from '../../Components/loader';
import { MovieCard } from '../../Components/movie-card';


import React from 'react';
import { useGetMoviesQuery } from '../../features/movieApiSlice';


export const Home = () => {
    const { data, error, isLoading } = useGetMoviesQuery();

    if (error) return <p className={styles.home}>Failed to load movies. Try again later.</p>;

    return (

        <div className={styles.home}>
            {
                isLoading ?
                    <Loader /> :
                    <div className={styles.movieList}>
                        <h1>Movies</h1>
                        {
                            data?.Search.map((movie) => (
                                <MovieCard
                                    className={styles.movieItem}
                                    key={movie.imdbID}
                                    poster={movie.Poster}
                                    title={movie.Title}
                                    year={movie.Year}
                                />
                            ))
                        }
                    </div>
            }
        </div>
    );
};