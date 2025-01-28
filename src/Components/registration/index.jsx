import React, { useState, useEffect } from 'react';
import { useUser } from '../../app/context';
import styles from './index.module.css';

const Registration = () => {
    const { setUser, setAuthorized } = useUser();
    const [isRegistered, setIsRegistered] = useState(true); // Переключение между "Вход" и "Регистрация"
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        // Проверяем, есть ли авторизованный пользователь
        const savedUser = JSON.parse(localStorage.getItem('current-user'));
        if (savedUser && savedUser.isAuthorized) {
            setUser(savedUser.login);
            setAuthorized(true);
        }
    }, [setUser, setAuthorized]);

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

        // Регистрация
        if (!isRegistered) {
            if (formData.password.length < 8 || formData.login.length < 8) {
                setError('Login and Password must be at least 8 characters long');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            // Проверяем, существует ли уже пользователь с таким логином
            const userExists = users.some((user) => user.login === formData.login);
            if (userExists) {
                setError('User already exists');
                return;
            }

            // Добавляем нового пользователя в массив
            const newUser = {
                login: formData.login,
                password: formData.password,
                isAuthorized: false,
                favoritesMoviesIds: [],
            };
            storedData.users.push(newUser);

            // Сохраняем обновлённые данные
            localStorage.setItem('moviPortal', JSON.stringify(storedData));
            setIsRegistered(true);
            resetForm();
            return;
        }

        // Вход
        const user = users.find((u) => u.login === formData.login);

        if (!user) {
            setError('User not found');
            return;
        }
        if (user.password !== formData.password) {
            setError('Invalid password');
            return;
        }

        // Обновляем статус авторизации у пользователя
        user.isAuthorized = true;
        localStorage.setItem('moviPortal', JSON.stringify(storedData));

        // Сохраняем текущего пользователя
        localStorage.setItem('current-user', JSON.stringify(user));
        setUser(user.login);
        setAuthorized(true);
        resetForm();
    };

    return (
        <div className={styles.container}>
            <h2>{isRegistered ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="login"
                    placeholder="Login"
                    value={formData.login}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
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
                <button type="submit" className={styles.button}>
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