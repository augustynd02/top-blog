import styles from './postpreview.module.css';

function PostPreview({ title, content, created_at }) {
    const postPath = `/posts/${title.replace(' ', '-')}`
    return (
        <article className={styles.postPreview}>
            <a href={postPath}>
                <div className={styles.cover}>

                </div>
                <div className={styles.content}>
                    <h3>{title}</h3>
                    <span>{created_at}</span>
                    <p>{content}</p>
                </div>
            </a>
        </article>
    )
}

export default PostPreview;
