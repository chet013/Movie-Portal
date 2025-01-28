import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../app/context';
import { Bar } from '../bar/index';
import styles from './index.module.css';
import { Button } from 'antd';

export const Header = () => {
    const navigate = useNavigate();
    const { user, authorized, setUser, setAuthorized } = useUser();
    const [displayUser, setDisplayUser] = useState('');

    useEffect(() => {
        if (authorized) {
            setDisplayUser(`User: ${user}`);
        } else {
            setDisplayUser('Please log in');
        }
    }, [user, authorized]);

    const handleExitLogin = () => {
        // Получаем массив всех пользователей
        const storedData = JSON.parse(localStorage.getItem('moviPortal')) || { users: [] };

        // Обновляем всех пользователей, устанавливая isAuthorized в false
        const updatedUsers = storedData.users.map((user) => ({
            ...user,
            isAuthorized: false
        }));

        // Сохраняем обновлённый массив пользователей
        localStorage.setItem('moviPortal', JSON.stringify({ users: updatedUsers }));

        // Удаляем текущего пользователя из localStorage
        localStorage.removeItem('current-user');

        // Сбрасываем состояние в контексте
        setUser(null);
        setAuthorized(false);

        // Перенаправляем пользователя на страницу входа
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
                <p className={styles.logInfo}>{displayUser}</p>
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