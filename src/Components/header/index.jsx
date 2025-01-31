import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../app/context';
import { Bar } from '../bar/index';
import styles from './index.module.css';
import { Button } from 'antd';

export const Header = () => {
    const navigate = useNavigate();
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
        <div className={styles.header}>
            <button
                className={styles.logoBtn}
                onClick={() => navigate('home', { replace: false })}
            >
                <img
                    className={styles.imageLogo}
                    src={'/logo.png'}
                    alt={'logo'}
                />
            </button>
            <Bar />
            <div className={styles.inform}>
                <p className={styles.logInfo}>{authorized ? `User: ${user}` : 'Please log in'}</p>
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
                </Button>
            </div>
        </div>
    );
};