import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../app/context';
import { Bar } from '../bar/index';
import styles from './index.module.css';

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
            </div>
        </div>
    );
};