import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const links = [
    { name: 'Home', path: 'home' },
    { name: 'Favorites', path: 'favorites' },
    { name: 'Login', path: 'login' },

];

export const Bar = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.links}>
            {
                links.map((link) => (
                    <Button
                        key={link.name}
                        onClick={() => navigate(link.path, { replace: false })}
                        type="primary"
                        htmlType="submit"
                        color="default"
                        variant="solid"
                        className={styles.link}
                    >
                        {link.name}
                    </Button>
                ))
            }
        </div>
    )
}