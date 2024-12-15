import styles from './link.module.css';

function Link({ path, isStyled, children }) {
    return <a href={`"${path}"`} className={isStyled ? styles.styledLink : undefined}>{children}</a>
}

export default Link;
