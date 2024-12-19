import styles from './header.module.css';
import logo from '../../assets/icons/logo.svg';

import Link from '../Link/Link';

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
                        <li><Link href="/" isStyled={false} >Homepage</Link></li>
                        <li><Link href="/about-me" isStyled={false} >About me</Link></li>
                        <li><Link href="/login" isStyled={false} >Login</Link></li>
                        <li><Link href="/register" isStyled={true} >Sign up</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;
