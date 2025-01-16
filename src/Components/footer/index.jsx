import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.footer}>
            <button
                className={styles.logoBtn}
                onClick={() => navigate('home', { replace: false })}
            >
                <img
                    className={styles.image}
                    src={'/logo.png'}
                    alt={'img'}
                />
            </button>
            <p>Footer</p>
            <div className={styles.inform}>
                <img
                    className={styles.image}
                    src={'/darck theme.png'}
                    alt={'img'}
                />
            </div>
        </div >
    );
};