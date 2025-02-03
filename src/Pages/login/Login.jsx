import styles from './index.module.css';
import Registartion from '../../Components/registration/Registration'
import { useUser } from '../../app/context';

export default function Login() {
    const { isDarkTheme } = useUser()
    return (
        <div className={!isDarkTheme ? styles.loginPage : styles.loginPageDark}>
            <Registartion />
        </div >
    )
}