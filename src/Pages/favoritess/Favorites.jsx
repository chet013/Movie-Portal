import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useUser } from '../../app/context';
import { FavoriteMovie } from '../../Components/movie-card/FavoriteMovie';
import { Loader } from '../../Components/loader/Loader';

export default function Favorites() {
    const { authorized, favoritesMoviesIds, loading } = useUser();

    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/movie/${id}`);
    };

    if (!authorized) {
        return (
            <div className={`${styles.container} ${styles.favoritesLoginContainer}`}>
                <p className={styles.favoritesLoginDiscription}>
                    Please register or log in
                </p>

                <Button
                    onClick={() => navigate('/login', { replace: false })}
                    type="primary"
                    htmlType="submit"
                    color="default"
                    variant="solid"
                    className={styles.logBtn}
                >
                    Login / Registration
                </Button>

            </div>
        );
    }

    if (loading) {
        return (
            <Loader />
        );
    }

    return (
        <div className={`${styles.container} ${styles.favorites}`}>
            {favoritesMoviesIds?.length === 0 ? (
                <p className={styles.emptyMessage}>You have no favorite movies yet.</p>
            ) : (
                favoritesMoviesIds.map((id) => (
                    <button
                        key={id}
                        className={styles.movieButton}
                        onClick={() => handleNavigate(id)}
                    >
                        <FavoriteMovie id={id} />
                    </button>
                ))
            )}
        </div>
    );
};