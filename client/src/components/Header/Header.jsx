import styles from './header.module.css';
import logo from '../../assets/icons/logo.svg';

import Link from '../Link/Link';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext'
import { RxHamburgerMenu } from "react-icons/rx";

function Header() {
    const { user, setUser, isLoading } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const logout = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/session`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            setUser(null);
        } else {
            console.error('Failed to logout.');
        }
    };

    return (
        <header>
            <div className={styles.headerContainer}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt="logo" className={styles.logo} />
                    <h1>asp<span className="highlight">devs</span></h1>
                </div>
                <nav>
                    <ul className={`${styles.desktop} ${isLoading ? '' : styles.loaded}`}>
                        <li><Link href="/" isStyled={false} >Homepage</Link></li>
                        <li><Link href="/about-me" isStyled={false} >About me</Link></li>

                        {user ? (
                            <>
                                <li className={styles.headerWelcome}>Welcome, {user.username}!</li>
                                <li><button onClick={logout} className={styles.styledLink}>Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li><Link href="/login" isStyled={false} >Login</Link></li>
                                <li><Link href="/register" isStyled={true} >Sign up</Link></li>
                            </>
                        )}

                    </ul>

                    <RxHamburgerMenu className={styles.menu} onClick={toggleMenu} />
                    {isMenuOpen && (
                        <ul className={styles.mobile}>
                            <li><Link href="/" isStyled={false} >Homepage</Link></li>
                            <li><Link href="/about-me" isStyled={false} >About me</Link></li>
                            {user ? (
                                <>
                                    <div className={styles.logoutContainer}>
                                        <span className={styles.headerWelcome}>Welcome, {user.username}!</span>
                                        <li><button onClick={logout} className={styles.styledLink}>Logout</button></li>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <li><Link href="/login" isStyled={false} >Login</Link></li>
                                    <li><Link href="/register" isStyled={true} >Sign up</Link></li>
                                </>
                            )}
                        </ul>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header;
