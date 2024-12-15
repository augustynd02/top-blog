import styles from './header.module.css';
import logo from '../../assets/icons/logo.svg';

function Header() {
    return (
        <header>
            <div className={styles.headerContainer}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt="logo" className={styles.logo}/>
                    <h1>aspdevs</h1>
                </div>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about-me">About me</a></li>
                        <li><a href="/login">Log in</a></li>
                        <li><a href="/register" className={styles.styledLink}>Sign up</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;
