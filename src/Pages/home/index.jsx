import styles from './index.module.css';
import { Loader } from '../../Components/loader';

import React from 'react';
import { useGetMoviesQuery } from '../../features/movieApiSlice';


export const Home = () => {
    const { data, error, isLoading } = useGetMoviesQuery();

    // if (isLoading) return <Loader className={styles.home} />;
    if (error) return <p className={styles.home}>Failed to load movies. Try again later.</p>;

    return (
        <div className={styles.home}>

            {
                isLoading ?
                    <Loader /> :
                    <div>
                        <h1>Movies</h1>
                        <ul className={styles.movieList}>
                            {data?.Search.map((movie) => (
                                <li key={movie.imdbID} className={styles.movieItem}>
                                    <h3>{movie.Title}</h3>
                                    <p>Year: {movie.Year}</p>
                                    <img src={movie.Poster} alt={movie.Title} width="150" />
                                </li>
                            ))}
                        </ul>
                    </div>
            }

        </div>

    );
};