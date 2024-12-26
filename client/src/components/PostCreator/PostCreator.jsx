import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './postcreator.module.css';

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

export default PostCreator;
