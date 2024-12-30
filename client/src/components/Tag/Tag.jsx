import styles from './tag.module.css';

function Tag({ type, cb, children }) {
    let classes = [styles.tag, styles[type]]
    if (cb) classes.push(styles.clickable);
    return (
        <span className={classes.join(' ')} onClick={cb}>{children}</span>
    )
}

export default Tag;
