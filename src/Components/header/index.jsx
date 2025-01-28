import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../app/context';
import { Bar } from '../bar/index';
import styles from './index.module.css';
import { Button } from 'antd'

export const Header = () => {
    const navigate = useNavigate();
    const { user, authorized } = useUser();
    const [displayUser, setDisplayUser] = useState('');

    useEffect(() => {

        if (authorized) {
            setDisplayUser(`User: ${user}`);
        } else {
            setDisplayUser('Please log in');
        }
    }, [user, authorized]);

    const handleExit = () => {
        // сохраняем данные юзера в Local Storage
        const currentUser = JSON.parse(localStorage.getItem('current-user'));
        if (currentUser) {
            const updatedUser = { ...currentUser, authorized: false };
            localStorage.setItem('current-user', JSON.stringify(updatedUser));
        }

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
                <Button
                    onClick={() => (authorized ? handleExit() : navigate('/login', { replace: false }))}
                    type="primary"
                    htmlType="submit"
                    color="default"
                    variant="solid"
                    className={styles.logBtn}
                >
                    {authorized ? 'Exit' : 'Login / Registration'}
                </Button>
                <p className={styles.logInfo}>{displayUser}</p>
            </div>
        </div>
    );
};





// const localStorage = {
//     moviPortal: {
//         users: [
//             {
//                 login: 123,
//                 password: 123,
//                 isAutorized: false,
//                 favoritesMoviesIds: []
//             }
//         ],
//     }
// }