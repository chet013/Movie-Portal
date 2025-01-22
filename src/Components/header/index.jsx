import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../app/context';
import { Bar } from '../bar/index'

export const Header = () => {
    const navigate = useNavigate();
    const { user, authorized } = useUser();

    return (

        <div className={styles.header}>
            <>
                <button
                    className={styles.logoBtn}
                    onClick={() => navigate('home', { replace: false })}
                >
                    <img
                        className={styles.imageLogo}
                        src={'/logo.png'}
                        alt={'img'}
                    />
                </button>
                <Bar />
                <div className={styles.inform}>
                    {authorized ? <p className={styles.loginInfo}> user: {user}</p> : <p className={styles.logInfo}>Please log in</p>}
                    <img
                        className={styles.image}
                        src={'/darck-theme.png'}
                        alt={'img'}
                    />
                </div>
            </>

        </div >
    );
};