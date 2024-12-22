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
        } catch(err) {
            setError('Failed to connect to the server: ' + err);
        }
    }
    return (
        <>
            <Header />
            <main>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" onChange={handleChange} />

                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" id="password" onChange={handleChange} />

                    <button type="submit">Submit</button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
            </main>
            <Footer />
        </>
    )
}

export default LoginPage;
