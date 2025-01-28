import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useUser } from '../../app/context';


export const Favorites = () => {
    const { authorized } = useUser();
    const navigate = useNavigate()

    if (!authorized) {

        return (
            <div className={`${styles.container} ${styles.favoritesLoginContainer}`}>
                <p className={styles.favoritesLoginDiscription}>
                    Please register or log in
                </p>
                <Button
                    onClick={() =>
                        navigate('/login', { replace: false })
                    }
                    type="primary"
                    htmlType="submit"
                    color="default"
                    variant="solid"
                    className={styles.logBtn}
                >
                    Login / Registration
                </Button>
            </div>
        )
    }

    return (

        <div className={`${styles.container} ${styles.favorites}`}>
            <p>
                Список избранных фильмов
            </p>
        </div>
    )
}