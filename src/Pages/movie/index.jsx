import { useParams } from 'react-router-dom';
import { Loader } from '../../Components/loader';
import { useGetFilmQuery } from '../../api/movieApiSlice'
import styles from './index.module.css';

export const Movie = () => {
    const { id } = useParams();

    const { data, error, isLoading } = useGetFilmQuery(id);

    const movie = data

    const handleClickLike = () => {

    }

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
                                    <button onClick={handleClickLike}>
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
