import PropTypes from 'prop-types';
import styles from './index.module.css';
import { useUser } from '../../app/context';

export const MovieCard = ({ poster, title, year }) => {

    const { isDarkTheme } = useUser()

    return (
        <div className={!isDarkTheme ? styles.card : styles.cardDark}>
            <img
                className={styles.logo}
                src={poster}
                alt={title}
            />
            <div className={!isDarkTheme ? styles.description : styles.descriptionDark}>
                <h2 className={styles.title}>{title}</h2>
                <p>Year: {year}</p>
            </div>
        </div>
    );
};

MovieCard.propTypes = {
    poster: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
};

export default MovieCard;