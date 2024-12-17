import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Link from "../../components/Link/Link";

import styles from "./homepage.module.css";
import heroImage from "../../assets/images/hero.jpg";

import { useState, useEffect } from "react";

function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:3000/api/posts');
            const result = await response.json();
            setPosts(result);
        }

        fetchPosts();
    }, [])
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
                            <Link href="/register" isStyled={true}>Sign up now!</Link>
                            <Link href="/about-me" isStyled={false}>Read about me</Link>
                        </div>
                    </div>
                    <div className={styles.welcomeImage}>
                        <img src={heroImage} alt="Coding hero image" />
                    </div>
                </div>
                <section>
                    <h2>Available <span>dev</span> blog articles:</h2>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default HomePage;
