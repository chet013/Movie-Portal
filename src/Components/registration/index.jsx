import React, { useState } from 'react';
import styles from './index.module.css';

const Registration = () => {
    const [isRegistered, setIsRegistered] = useState(true);
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

            localStorage.setItem(`login - ${formData.login}`, formData.login)
            localStorage.setItem(`password - ${formData.login}`, formData.password)

            console.log('Register:', {
                login: formData.login,
                password: formData.password,
            });

        } else {

            if (localStorage.getItem(`login - ${formData.login}`) !== formData.login) {
                setError('Invalid login')

            }

            if (localStorage.getItem(`password - ${formData.login}`) !== formData.password) {
                setError('Invalid password')
            }

            setIsRegistered(true)
            console.log('Login:', { login: formData.login, password: formData.password });
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
                    }}
                >
                    {isRegistered ? ' Register' : ' Login'}
                </span>
            </p>
        </div>
    );
};

export default Registration;