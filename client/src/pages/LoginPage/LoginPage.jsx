import useDocumentTitle from '../../hooks/useDocumentTitle';

import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'
import Error from '../../components/Error/Error';

import styles from './loginpage.module.css';

function LoginPage() {
    useDocumentTitle('login');
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data.user)
                setError(null);
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
                                <input required type="password" name="password" id="password" onChange={handleChange} />
                            </div>
                            <button type="submit">Login</button>
                            <p>Don&apos;t have an account yet? <a href="/register">Sign up!</a></p>
                        </form>
                    </div>
                </div>
            </main>
            { error ? <Error message={error} /> : null }
        </>
    )
}

export default LoginPage;
