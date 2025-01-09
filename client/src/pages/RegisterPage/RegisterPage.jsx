import useDocumentTitle from '../../hooks/useDocumentTitle';

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
                            {error && <p className="error">{error}</p>}
                            <p>Already have an account? <a href="/login">Sign in!</a></p>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}

export default RegisterPage;
