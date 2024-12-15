import styles from './link.module.css';

function Link({ href, isStyled, children }) {
    return <a href={href} className={isStyled ? styles.styledLink : undefined}>{children}</a>
}

export default Link;
