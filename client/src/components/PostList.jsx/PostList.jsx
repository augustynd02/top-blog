import { useState, useEffect } from 'react';

import Tag from '../Tag/Tag';

import styles from './postlist.module.css';

function AdminPost({ post, switchToEdit }) {
    const handleDelete = async (post) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${post.id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            const data = await response.json();

            if (!response.ok) {
                console.log(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.post}>
            <div className={styles.info}>
                <h2>{post.title}</h2>
                <div className={styles.tags}>
                    <Tag type='date'>{post.created_at}</Tag>
                    {post.tags.map(tag => {
                        return <Tag key={tag.id} type='category'>{tag.name}</Tag>
                    })}
                </div>
            </div>
            <div className={styles.actions}>
                <button type="button" className={styles.edit} onClick={() => { switchToEdit(post) }}>Edit</button>
                <button type="button" className={styles.delete} onClick={() => { handleDelete(post) }}>Delete</button>
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
                const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
                    method: 'get',
                    credentials: 'include'
                });
                const data = await response.json();

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
        <div className={styles.postListWrapper}>
            <h2>Posts</h2>
            <div className={styles.listContainer}>
                {error && <p>{error}</p>}
                {posts.map(post => {
                    return <AdminPost key={post.id} post={post} switchToEdit={switchToEdit}/>
                })}
            </div>
        </div>
    )
}

export default PostList;
