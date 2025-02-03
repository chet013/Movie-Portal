import PropTypes from 'prop-types';
import { MovieCard } from './MovieCard';
import { useGetFilmQuery } from '../../api/movieApiSlice';

export const FavoriteMovie = ({ id }) => {
    const { data: movie, error, isLoading } = useGetFilmQuery(id);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading movie</p>;
    if (!movie) return null;

    return (
        <MovieCard
            poster={movie.Poster}
            title={movie.Title}
            year={movie.Year}
        />
    );
};

FavoriteMovie.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default FavoriteMovie;