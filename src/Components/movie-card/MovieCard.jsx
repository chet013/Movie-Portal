import PropTypes from 'prop-types';
import styles from './index.module.css';

export const MovieCard = ({ poster, title, year }) => {
    return (
        <div className={styles.card}>
            <img
                className={styles.logo}
                src={poster}
                alt={title}
            />
            <div className={styles.description}>
                <h2 className={styles.title}>{title}</h2>
                <p>Year: {year}</p>
            </div>
        </div>
    );
};

MovieCard.propTypes = {
    poster: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
};

export default MovieCard;