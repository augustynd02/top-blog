import styles from './postpreview.module.css';

import { useState, useEffect } from 'react';
import dummyImage from '../../assets/images/hero.jpg'

function PostPreview({ cb }) {
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
                <Card key={post.id} post={post} cb={cb}/>
            ))}
        </div>
    )
}

function Card({ post, cb }) {
    const postPath = `posts/${post.title.replace(' ', '-')}`
    if (cb) {
        return (
            <article className={styles.preview} onClick={() => cb(post)}>
                <div className={styles.cover}>
                    <img src={dummyImage} />
                </div>
                <div className={styles.content}>
                    <h3>{post.title}</h3>
                    <span>{post.created_at}</span>
                    <p>{post.content}</p>
                </div>
            </article>
        )
    }

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
