import useDocumentTitle from '../../hooks/useDocumentTitle';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './registerpage.module.css';
import Error from '../../components/Error/Error';

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

        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formData),
            });

            console.log(response);

            if (response.ok) {
                navigate('/login')
                setError(null);
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
            <main>
                <div className={styles.registerWrapper}>
                    <div className={styles.registerContainer}>
                        <div className={styles.registerHeader}>
                            <h2>Sign up</h2>
                            <p>and participate in the <span className="highlight">journey</span> with the <span className="highlight">community</span>!</p>
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
                            <button type="submit">Register</button>
                            <p>Already have an account? <a href="/login">Sign in!</a></p>
                        </form>
                    </div>
                </div>
                { error ? <Error message={error} /> : null }
            </main>
        </>
    )
}

export default RegisterPage;
