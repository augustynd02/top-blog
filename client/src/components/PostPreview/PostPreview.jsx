import styles from './postpreview.module.css';

import { useState, useEffect } from 'react';
import dummyImage from '../../assets/images/hero.jpg'

function PostPreview() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:3000/api/posts');
            const result = await response.json();
            result.forEach(post => {
                post.content = post.content.slice('0', '300');
            })
            setPosts(result);
        }

        fetchPosts();
    }, [])
    return (
        <div className={styles.postsPreviewContainer}>
            {posts.map(post => (
                <Card key={post.id} post={post}/>
            ))}
        </div>
    )
}

function Card({ post }) {
    const postPath = `posts/${post.title.replace(' ', '-')}`

    return (
        <a href={postPath} className={styles.previewWrapper}>
            <article className={styles.preview}>
                    <div className={styles.cover}>
                        <img src={dummyImage} />
                    </div>
                    <div className={styles.content}>
                        <h3>{post.title}</h3>
                        <span>{post.created_at}</span>
                        <p>{post.content}</p>
                    </div>
            </article>
        </a>
    )
}

export default PostPreview;
