import { useState, useEffect } from 'react';

import styles from './postlist.module.css';

function AdminPost({ post, switchToEdit }) {
    return (
        <div className={styles.post}>
            <div className={styles.info}>
                <h2>{post.title}</h2>
                <div className={styles.tags}>
                    <span>{post.created_at}</span>
                </div>
            </div>
            <div className={styles.actions}>
                <button type="button" onClick={() => { switchToEdit(post) }}>Edit</button>
                <button type="button">Delete</button>
            </div>
        </div>
    )
}

function PostList({ switchToEdit }) {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const fetchPosts = async () => {
                const response = await fetch('http://localhost:3000/api/posts');
                const data = await response.json();
                console.log(data);

                if (response.ok) {
                    setPosts(data)
                } else {
                    setError('Error fetching posts: ' + data.message);
                }
            }
            fetchPosts();
        } catch (err) {
            setError('Error: ' + err)
        }
    }, [])

    return (
        <>
            <h2>Posts</h2>
            <div className={styles.listContainer}>
                {error && <p>{error}</p>}
                {posts.map(post => {
                    return <AdminPost key={post.id} post={post} switchToEdit={switchToEdit}/>
                })}
            </div>
        </>
    )
}

export default PostList;
