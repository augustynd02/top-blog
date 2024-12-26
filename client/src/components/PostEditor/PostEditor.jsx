import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostEditor({ currentPost }) {
    const [formData, setFormData] = useState({ title: currentPost.title, content: currentPost.content, post_id: currentPost.id});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/posts/${currentPost.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Edited post: ', data.message);
                navigate('/admin')
            } else {
                setError('Error: ', data.message);
            }
        } catch (err) {
            setError('Error: ', err);
        }
    }

    return (
        <>
            <h2>Edit post</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleChange}/>

                <label htmlFor="content">Content</label>
                <textarea name="content" id="content" value={formData.content} onChange={handleChange}></textarea>

                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default PostEditor;
