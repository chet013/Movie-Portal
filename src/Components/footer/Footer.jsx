import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../app/context';
import logo from '../../picktures/logo.png'
import darkTheme from '../../picktures/darck-theme.png'

export const Footer = () => {
    const navigate = useNavigate();
    const { isDarkTheme, setIsDarkTheme } = useUser()

    const darkThemeCange = () => {
        setIsDarkTheme(!isDarkTheme)
    }

    return (
        <div className={styles.footer}>
            <button
                className={styles.logoBtn}
                onClick={() => navigate('home', { replace: false })}
            >
                <img
                    className={styles.image}
                    src={logo}
                    alt={'img'}
                />
            </button>
            <p>Footer</p>
            <button
                className={styles.darkTheme}
                onClick={darkThemeCange}
            >
                <img
                    className={styles.image}
                    src={darkTheme}
                    alt={'img'}
                />
            </button>
        </div >
    );
};