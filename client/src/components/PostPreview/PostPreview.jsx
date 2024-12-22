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
                <Card key={post.id} title={post.title} content={post.content} created_at={post.created_at} />
            ))}
        </div>
    )
}

function Card({ title, content, created_at }) {
    const postPath = `/posts/${title.replace(' ', '-')}`
    return (
        <a href={postPath} className={styles.previewWrapper}>
            <article className={styles.preview}>
                    <div className={styles.cover}>
                        <img src={dummyImage} />
                    </div>
                    <div className={styles.content}>
                        <h3>{title}</h3>
                        <span>{created_at}</span>
                        <p>{content}</p>
                    </div>
            </article>
        </a>
    )
}

export default PostPreview;
