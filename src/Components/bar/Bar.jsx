import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { useDetectDevice } from '../../features/useDetectDevice';
import { Button } from 'antd';

const links = [
    { name: 'Home', path: 'home' },
    { name: 'Favorites', path: 'favorites' },
];

export const Bar = () => {

    const isMobile = useDetectDevice()
    const navigate = useNavigate();

    return (
        <div className={`${styles.links} ${isMobile ? styles.mobileLinks : ''}`}>
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