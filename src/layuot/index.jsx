import { Outlet } from 'react-router-dom';
import { Footer } from '../Components/footer';
import { Header } from '../Components/header';
import styles from './index.module.css';

export const Layout = () => {


    return (
        <>
            <nav className={styles.layout}>
                <Header />

                <Outlet />
                <Footer />
            </nav>
        </>
    );
};