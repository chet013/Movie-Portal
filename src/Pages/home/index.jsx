import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { setMovies } from '../../redux/slice/moviesSlice'
import { selectMovies } from '../../redux/selectors/selectMovies'
import { Loader } from '../../Components/loader';
import { MovieCard } from '../../Components/movie-card';
import Searchfild from '../../Components/serch-input';
import { ErrorPage } from '../404/index'

import { useGetMoviesMutation } from '../../api/movieApiSlice';

export const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const movies = useSelector(selectMovies);
    const [isNotFaund, setIsNotFound] = useState(false)


    const [getMovies, { data, error, isLoading }] = useGetMoviesMutation();

    useEffect(() => {
        if (data) {
            dispatch(setMovies(data.Search));
        }
    }, [data, dispatch]);

    const handleSearch = async (word) => {
        const response = await getMovies(word);

        if (response.data.Response === 'False') {
            setIsNotFound(true);
            dispatch(setMovies([]));
        } else {
            setIsNotFound(false);
        }
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
                    {isNotFaund && <div className={styles.notFaund}>Ничего не найдено :(</div>}
                    {!isNotFaund && movies && movies.map((movie) => (
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