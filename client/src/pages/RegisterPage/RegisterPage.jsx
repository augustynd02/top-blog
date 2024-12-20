import useDocumentTitle from '../../hooks/useDocumentTitle';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './registerpage.module.css';

function RegisterPage() {
    useDocumentTitle('register');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formData),
            });

            console.log(response);

            if (response.ok) {
                navigate('/login')
            } else {
                const data = await response.json();
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
                <h2>Register</h2>
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

export default RegisterPage;
