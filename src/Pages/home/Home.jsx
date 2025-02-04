import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { setMovies } from '../../redux/slice/moviesSlice';
import { selectMovies } from '../../redux/selectors/selectMovies';
import { Loader } from '../../Components/loader/Loader';
import { MovieCard } from '../../Components/movie-card/MovieCard';
import SearchField from '../../Components/serch-input/Serchfild';
import { ErrorPage } from '../404/Errorpage';
import { useGetMoviesMutation } from '../../api/movieApiSlice';
import { useUser } from '../../app/context';
import fiters from '../../picktures/filter.png'

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const movies = useSelector(selectMovies);

    const [isNotFound, setIsNotFound] = useState(false);
    const [sortOrder, setSortOrder] = useState('default');

    const { isDarkTheme } = useUser()

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
    };


    const sortedMovies = Array.isArray(movies) ? [...movies].sort((a, b) => {
        switch (sortOrder) {
            case 'year-asc':
                return parseInt(a.Year) - parseInt(b.Year);
            case 'year-desc':
                return parseInt(b.Year) - parseInt(a.Year);
            case 'title-asc':
                return a.Title.localeCompare(b.Title);
            case 'title-desc':
                return b.Title.localeCompare(a.Title);
            default:
                return 0;
        }
    }) : [];

    return (
        <div className={!isDarkTheme ? styles.home : styles.darkHome}>
            {isLoading ? (
                <Loader />
            ) : (
                <div className={!isDarkTheme ? styles.movieList : styles.darkMovieList}>
                    <h1>Movies</h1>
                    <SearchField onSearch={handleSearch} />
                    <div className={styles.filters}>
                        <img
                            className={styles.imageFilter}
                            src={fiters}
                            alt={'filter'}
                        />

                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="default">Sort...</option>
                            <option value="year-asc">Year: Oldest First</option>
                            <option value="year-desc">Year: Newest First</option>
                            <option value="title-asc">Title: A → Z</option>
                            <option value="title-desc">Title: Z → A</option>
                        </select>
                    </div>

                    {isNotFound ? (
                        <div className={styles.notFound}>Ничего не найдено :(</div>
                    ) : sortedMovies.length > 0 ? (
                        sortedMovies.map((movie) => (
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
                        ))
                    ) : (
                        <div className={styles.notFound}>Начните поиск фильмов!</div>
                    )}
                </div>
            )}
        </div>
    );

};