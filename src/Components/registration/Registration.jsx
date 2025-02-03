import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../app/context';
import styles from './index.module.css';

const Registration = () => {
    const navigate = useNavigate();
    const { setFavoritesMoviesIds, setUser, setAuthorized } = useUser();

    const [isDisabled, setIsDisabled] = useState(false);
    const [isRegistered, setIsRegistered] = useState(true);
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('current-user'));
        if (savedUser && savedUser.isAuthorized) {
            setUser(savedUser.login);
            setAuthorized(true);
            setIsDisabled(true);
            navigate('/home', { replace: true });
        }
    }, [setUser, setAuthorized, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData({ login: '', password: '', confirmPassword: '' });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const storedData = JSON.parse(localStorage.getItem('moviPortal')) || { users: [] };
        const { users } = storedData;

        if (!isRegistered) {
            // Регистрация
            if (formData.password.length < 8 || formData.login.length < 8) {
                setError('Login and Password must be at least 8 characters long');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            const userExists = users.some((user) => user.login === formData.login);
            if (userExists) {
                setError('User already exists');
                return;
            }

            const newUser = {
                login: formData.login,
                password: formData.password,
                isAuthorized: false,
                favoritesMoviesIds: [],
            };
            storedData.users.push(newUser);
            localStorage.setItem('moviPortal', JSON.stringify(storedData));
            setIsRegistered(true);
            resetForm();
            return;
        }

        // Логин
        const user = users.find((u) => u.login === formData.login);
        if (!user) {
            setError('User not found');
            return;
        }
        if (user.password !== formData.password) {
            setError('Invalid password');
            return;
        }

        const updatedUsers = users.map((u) =>
            u.login === user.login
                ? { ...u, isAuthorized: true }
                : { ...u, isAuthorized: false }
        );
        localStorage.setItem('moviPortal', JSON.stringify({ users: updatedUsers }));

        const currentUser = { ...user, isAuthorized: true };
        localStorage.setItem('current-user', JSON.stringify(currentUser));

        setUser(user.login);
        setFavoritesMoviesIds([])
        setAuthorized(true);
        setIsDisabled(true);
        resetForm();
        navigate('/home', { replace: true });
    };

    return (
        <div className={styles.container}>
            <h2>{isRegistered ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    disabled={isDisabled}
                    type="text"
                    name="login"
                    placeholder={isDisabled ? 'The user is already authorized' : 'Login'}
                    value={formData.login}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                />
                <input
                    disabled={isDisabled}
                    type="password"
                    name="password"
                    placeholder={isDisabled ? 'The user is already authorized' : 'Password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                />
                {!isRegistered && (
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                    />
                )}
                {error && <p className={styles.formError}>{error}</p>}
                <button
                    type="submit"
                    className={styles.buttonLogReg}
                    disabled={isDisabled}
                >
                    {isRegistered ? 'Login' : 'Register'}
                </button>
            </form>
            <p className={styles.switchText}>
                {isRegistered ? "Don't have an account?" : 'Already have an account?'}
                <span
                    className={styles.switchLink}
                    onClick={() => {
                        setIsRegistered((prev) => !prev);
                        resetForm();
                    }}
                >
                    {isRegistered ? ' Register' : ' Login'}
                </span>
            </p>
        </div>
    );
};

export default Registration;