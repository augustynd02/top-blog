import styles from './comments.module.css';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

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
        <section>
            <div className={styles.commentCreator}>
                <h3>Leave a comment</h3>
                <form onSubmit={handleSubmit}>
                    <textarea name="comment" id="comment" onChange={handleChange}></textarea>
                    <button type="submit">Comment</button>
                </form>
            </div>
            <div className={styles.commentsContainer}>
                <h3>Comments: </h3>
                <div className={styles.comments}>
                    { comments.map(comment => {
                        return (
                            <div key={comment.id} className={styles.comment}>
                                {comment.content}
                            </div>
                        )
                    }) }
                </div>
            </div>
        </section>
    )
}

export default Comments;
