import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import styles from "./homepage.module.css";
import heroImage from "../../assets/images/hero.jpg";

function HomePage() {
    return (
        <>
            <Header />
            <main>
                <div className={styles.welcomeContainer}>
                    <div className={styles.welcomeMessage}>
                        <div className={styles.messageContainer}>
                            <h2>Welcome to <span>aspdevs</span></h2>
                            <p>Hi there! My name is Dominik Augustyn, and this is my blog: written by an aspiring web developer, for other aspiring developers. Feel free to read all about my insights, experiences, tips and reflections!</p>
                        </div>
                        <div className={styles.action}>
                            <a href="/register" className={styles.styledLink}>Sign up</a>
                            <a href="/about-me">Read about me</a>
                        </div>
                    </div>
                    <div className={styles.welcomeImage}>
                        <img src={heroImage} alt="Coding hero image" />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default HomePage;
