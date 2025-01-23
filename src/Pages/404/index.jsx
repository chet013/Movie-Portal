import styles from './index.module.css'

export const ErrorPage = () => {
    return (
        <div className={styles.errorContainer}>
            <h1>404</h1>
            <p>Oops! The page you're looking for can't be found.</p>
        </div >
    )
}