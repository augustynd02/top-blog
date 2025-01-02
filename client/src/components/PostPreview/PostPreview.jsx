import styles from './postpreview.module.css';

import { useState, useEffect } from 'react';
import dummyImage from '../../assets/images/hero.jpg'

import Tag from '../Tag/Tag';

function PostPreview() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        try {
            const fetchPosts = async () => {
                const response = await fetch('http://localhost:3000/api/posts');

                const result = await response.json();

                if (response.ok) {
                    result.forEach(post => {
                        post.content = post.content.slice('0', '300');
                    })
                    setPosts(result);
                } else {
                    console.log(result.message);
                }
            }

            fetchPosts();
        } catch (err) {
            console.log(err);
        }

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
    const postPath = `posts/${post.title.replaceAll(' ', '-')}`

    return (
        <a href={postPath} className={styles.previewWrapper}>
            <article className={styles.preview}>
                    <div className={styles.cover}>
                        <img src={dummyImage} />
                    </div>
                    <div className={styles.content}>
                        <h3>{post.title}</h3>
                        <div className={styles.tags}>
                            <Tag type="date">{post.created_at}</Tag>
                            { post.tags.map(tag => <Tag key={tag.id} type="category">{tag.name}</Tag>)}
                        </div>
                        <p>{post.content}</p>
                    </div>
            </article>
        </a>
    )
}

export default PostPreview;
