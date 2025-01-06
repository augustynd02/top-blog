import styles from './comments.module.css';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Tag from '../Tag/Tag';

function Comments({ post }) {
    const { user } = useContext(AuthContext)
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const getComments = async () => {
            try {
                const formattedTitle = post.title.replaceAll('-', ' ');
                const response = await fetch(`http://localhost:3000/api/posts/${formattedTitle}/comments`, {
                    method: 'GET'
                });
                const data = await response.json();
                if (response.ok) {
                    setComments(data)
                } else {
                    setError(data.message)
                }
            } catch (err) {
                setError(err);
            }
        }
        getComments();
    }, [post])

    const handleChange = (e) => {
        setNewComment(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formattedTitle = post.title.replaceAll('-', ' ');
            const response = await fetch(`http://localhost:3000/api/posts/${formattedTitle}/comments`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ content: newComment, post_id: post.id, username: user.username })
            });
            const data = await response.json();
            if (response.ok) {
                setComments([...comments, data]);
            } else {
                setError(data.message);
            }
        } catch(err) {
            setError(err);
        }
    }

    return (
        <section className={styles.commentsWrapper}>
            <div className={styles.commentCreatorWrapper}>
                <div className={styles.commentCreator}>
                    <h3>Leave a comment</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="comment">Message</label>
                        <textarea required name="comment" id="comment" onChange={handleChange}></textarea>
                        <button type="submit" className="highlight">Comment</button>
                    </form>
                </div>
            </div>
            <div className={styles.commentsContainer}>
                <h3>Comments: </h3>
                <div className={styles.comments}>
                    { comments.map(comment => {
                        return (
                            <Comment key={comment.id} username={comment.user} date={comment.created_at} content={comment.content} />
                        )
                    }) }
                </div>
            </div>
        </section>
    )
}

function Comment({ username, date, content }) {
    return (
        <div className={styles.comment}>
            <div className={styles.commentInfo}>
                <span>{username}</span>
                <Tag type="date">{date}</Tag>
            </div>
            <div className={styles.commentContent}>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default Comments;
