import React, { useState } from 'react';
import { useUser } from '../../app/context';
import styles from './index.module.css';

const Registration = () => {
    const { setUser, setAuthorized } = useUser();
    const [isRegistered, setIsRegistered] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!isRegistered) {

            if (formData.password.length < 8) {
                setError('Password must be at least 8 characters long');
                return;
            }
            if (formData.login.length < 8) {
                setError('Login must be at least 8 characters long');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            // Сохраняем нового пользователя в Local Storage
            localStorage.setItem(
                `user-${formData.login}`,
                JSON.stringify({ login: formData.login, password: formData.password })
            );
            setIsRegistered(true);
        } else if (isAuthorized) {
            setError('You are already logged in')
        } else {
            const storedUser = localStorage.getItem(`user-${formData.login}`);
            if (!storedUser) {
                setError('Invalid login');
                return;
            }
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.password !== formData.password) {
                setError('Invalid password');
                return;
            }

            const updatedUser = { ...parsedUser, authorized: true };
            localStorage.setItem(`user-${formData.login}`, JSON.stringify(updatedUser));

            // Установка состояния в контексте
            setUser(updatedUser.login);
            setAuthorized(updatedUser.authorized);


            setIsAuthorized(true)

            console.log('user:', formData.login, 'authorized', updatedUser.authorized)
        }
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
                        setError('');
                        setFormData({ login: '', password: '', confirmPassword: '' });
                    }}
                >
                    {isRegistered ? ' Register' : ' Login'}
                </span>
            </p>
        </div>
    );
};

export default Registration;