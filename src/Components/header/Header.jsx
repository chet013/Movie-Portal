import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../app/context';
import { useDetectDevice } from '../../features/useDetectDevice';
import { Bar } from '../bar/Bar';
import styles from './index.module.css';
import { Button } from 'antd';
import logo from '../../picktures/logo.png'
import autorization from '../../picktures/autorization.png'

export const Header = () => {
    const navigate = useNavigate();
    const isMobile = useDetectDevice();
    const { user, authorized, setUser, setAuthorized } = useUser();

    const handleExitLogin = () => {
        const storedData = JSON.parse(localStorage.getItem('moviPortal')) || { users: [] };

        const updatedUsers = storedData.users.map((user) => ({
            ...user,
            isAuthorized: false
        }));

        localStorage.setItem('moviPortal', JSON.stringify({ users: updatedUsers }));
        localStorage.removeItem('current-user');

        setUser(null);
        setAuthorized(false);

        navigate('/login', { replace: true });
    };

    return (
        <div className={`${styles.header} ${isMobile ? styles.mobileHeader : ''}`}>
            <button
                className={styles.logoBtn}
                onClick={() => navigate('home', { replace: false })}
            >
                <img
                    className={styles.imageLogo}
                    src={logo}
                    alt={'logo'}
                />
            </button>
            <Bar />
            <div className={styles.inform}>
                {!isMobile ? <p className={styles.logInfo}>{authorized ? `User: ${user}` : 'Please log in'}</p> : null}
                {isMobile ?
                    <button
                        onClick={() =>
                            authorized ? handleExitLogin() : navigate('/login', { replace: false })
                        }
                        className={styles.loginBtn}
                    >
                        <img
                            className={styles.imageLogo}
                            src={autorization}
                            alt={'autorization'}
                        />
                    </button>
                    :
                    <Button
                        onClick={() =>
                            authorized ? handleExitLogin() : navigate('/login', { replace: false })
                        }
                        type="primary"
                        htmlType="submit"
                        color="default"
                        variant="solid"
                        className={styles.logBtn}
                    >
                        {authorized ? 'Exit' : 'Login / Registration'}

                    </Button>}

            </div>
        </div>
    );
};