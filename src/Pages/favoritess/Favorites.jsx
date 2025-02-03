import { useState, useEffect } from 'react';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useUser } from '../../app/context';
import { FavoriteMovie } from '../../Components/movie-card/FavoriteMovie';
import { Loader } from '../../Components/loader/Loader';

const MOVIES_PER_PAGE = 7;

export default function Favorites() {
    const { authorized, favoritesMoviesIds, loading, isDarkTheme } = useUser();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [favoritesMoviesIds]);

    const totalPages = Math.ceil((favoritesMoviesIds?.length || 0) / MOVIES_PER_PAGE);
    const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
    const currentMovies = favoritesMoviesIds?.slice(startIndex, startIndex + MOVIES_PER_PAGE);

    const handleNavigate = (id) => {
        navigate(`/movie/${id}`);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!authorized) {
        return (
            <div className={
                !isDarkTheme ?
                    `${styles.container} ${styles.favoritesLoginContainer}`
                    :
                    `${styles.containerDark} ${styles.favoritesLoginContainerDark}`}>
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
        return <Loader />;
    }

    return (
        <div className={
            !isDarkTheme ?
                `${styles.container} ${styles.favorites}`
                :
                `${styles.containerDark} ${styles.favoritesDark}`}>
            {favoritesMoviesIds?.length === 0 ? (
                <p className={styles.emptyMessage}>You have no favorite movies yet.</p>
            ) : (
                <>
                    <div className={styles.moviesGrid}>
                        {currentMovies.map((id) => (
                            <button
                                key={id}
                                className={styles.movieButton}
                                onClick={() => handleNavigate(id)}
                            >
                                <FavoriteMovie id={id} />
                            </button>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className={styles.pagination}>
                            <button
                                className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                «
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                <button
                                    key={page}
                                    className={`${styles.pageButton} ${page === currentPage ? styles.activePage : ''}`}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                »
                            </button>
                        </div>
                    )}
                </>
            )
            }
        </div >
    );
};