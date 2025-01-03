import useDocumentTitle from '../../hooks/useDocumentTitle';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'

import styles from './loginpage.module.css';

function LoginPage() {
    useDocumentTitle('login');
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);

    if (user) {
        return navigate('/');
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/auth', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user)
                navigate('/')
            } else {
                setError(data.message || 'Unknown error.');
            }
        } catch (err) {
            setError('Failed to connect to the server: ' + err);
        }
    }
    return (
        <>
            <Header />
            <main>
                <div className={styles.loginWrapper}>
                    <div className={styles.loginContainer}>
                        <div className={styles.loginHeader}>
                            <h2>Sign in</h2>
                            <p>Access your account and <span className="highlight">engage</span> in discussions!</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formField}>
                                <label htmlFor="username">Username</label>
                                <input required type="text" name="username" id="username" onChange={handleChange} />
                            </div>
                            <div className={styles.formField}>
                                <label htmlFor="password">Password</label>
                                <input required type="text" name="password" id="password" onChange={handleChange} />
                            </div>
                            <button type="submit">Login</button>
                            {error && <p className="error">{error}</p>}
                            <p>Already have an account? <a href="/login">Sign in!</a></p>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default LoginPage;
