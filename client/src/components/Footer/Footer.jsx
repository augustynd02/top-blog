import styles from './footer.module.css';
import githubIcon from '../../assets/icons/github.svg';
import linkedInIcon from '../../assets/icons/linkedin.svg';
import xIcon from '../../assets/icons/x.svg';

function Footer() {
    return (
        <footer>
            <span>made by Dominik Augustyn</span>
            <div className={styles.socialContainer}>
                <a href="https://www.linkedin.com/in/dominik-augustyn-996909332/">
                    <img src={linkedInIcon} alt="LinkedIn icon" />
                </a>
                <a href="https://github.com/augustynd02">
                    <img src={githubIcon} alt="Github icon" />
                </a>
                <a href="https://x.com/augustynd02">
                    <img src={xIcon} alt="X platform icon" />
                </a>
            </div>
        </footer>
    )
}

export default Footer;
