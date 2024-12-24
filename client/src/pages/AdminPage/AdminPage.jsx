import useDocumentTitle from '../../hooks/useDocumentTitle';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import addIcon from '../../assets/icons/add.svg';
import analyticsIcon from '../../assets/icons/analytics.svg';
import listIcon from '../../assets/icons/list.svg';

import styles from './AdminPage.module.css';

function PostCreator() {
    const [formData, setFormData] = useState({title: '', content: ''});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/posts', {
                method: 'POST',
                headers: { 'Content-type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(formData)
            })

            const data = await response.json();

            if (response.ok) {
                navigate('/admin')
            } else {
                setError(data.message || 'Unknown error.');
            }
        } catch (err) {
            setError('Unknown error: ' + err);
        }
    }

    return (
        <div className={styles.creatorContainer}>
            <h2>Create a blog post</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Post title</label>
                <input type="text" name="title" id="title" onChange={handleChange}/>

                <label htmlFor="content">Post content</label>
                <textarea name="content" id="content" onChange={handleChange}></textarea>

                <button type="submit">Post</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}

function PostList() {
    return <h2>list</h2>
}

function PostAnalytics() {
    return <h2>analytics</h2>
}

function AdminPage() {
    useDocumentTitle('admin')
    const [currentSection, setCurrentSection] = useState('list');
    const { user } = useAuth();
    if (!user || user.role_id != 2) {
        return <div>Not an admin</div>
    }

    return (
        <>
            <Header />
            <div className={styles.adminWrapper}>
                <div className={styles.actionsContainer}>
                    <ul>
                        <li onClick={() => {setCurrentSection('create')}}><img src={addIcon} alt="Add icon" /></li>
                        <li onClick={() => {setCurrentSection('list')}}><img src={listIcon} alt="List icon" /></li>
                        <li onClick={() => {setCurrentSection('analytics')}}><img src={analyticsIcon} alt="Analytics icon" /></li>
                    </ul>
                </div>
                <main>
                    {currentSection === 'create' && <PostCreator />}
                    {currentSection === 'list' && <PostList />}
                    {currentSection === 'analytics' && <PostAnalytics />}
                </main>
            </div>
            <Footer />
        </>
    )
}

export default AdminPage;
