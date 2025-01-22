import { Outlet } from 'react-router-dom';
import { Footer } from '../Components/footer';
import { Header } from '../Components/header';
import styles from './index.module.css';
import { UserProvider } from '../app/context';

export const Layout = () => {

    return (
        <UserProvider>
            <nav className={styles.layout}>
                <Header />
                <Outlet />
                <Footer />
            </nav>
        </UserProvider>
    );
};