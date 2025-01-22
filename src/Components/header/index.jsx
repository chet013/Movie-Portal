import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { Bar } from '../bar/index'

export const Header = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.header}>
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
            <Bar />
            <div className={styles.inform}>
                <img
                    className={styles.image}
                    src={'/darck-theme.png'}
                    alt={'img'}
                />
            </div>
        </div >
    );
};