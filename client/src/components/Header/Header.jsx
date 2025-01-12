import styles from './header.module.css';
import logo from '../../assets/icons/logo.svg';

import Link from '../Link/Link';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'

function Header() {
    const { user } = useContext(AuthContext);
    console.log(user);

    return (
        <header>
            <div className={styles.headerContainer}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt="logo" className={styles.logo}/>
                    <h1>asp<span className="highlight">devs</span></h1>
                </div>
                <nav>
                    <ul>
                        <li><Link href="/" isStyled={false} >Homepage</Link></li>
                        <li><Link href="/about-me" isStyled={false} >About me</Link></li>
                            {user ? (
                                <>
                                <li className={styles.headerWelcome}>Welcome, {user.username}!</li>
                                <li><Link href='/logout' isStyled={true}>Logout</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link href="/login" isStyled={false} >Login</Link></li>
                                    <li><Link href="/register" isStyled={true} >Sign up</Link></li>
                                </>
                            )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;
