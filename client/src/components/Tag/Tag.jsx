import styles from './tag.module.css';

function Tag({ type, children }) {
    return (
        <span className={`${styles.tag} ${styles[type]}`}>{children}</span>
    )
}

export default Tag;
