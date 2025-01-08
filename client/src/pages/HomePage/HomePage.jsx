import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Link from "../../components/Link/Link";
import PostPreview from "../../components/PostPreview/PostPreview";

import useDocumentTitle from "../../hooks/useDocumentTitle";

import styles from "./homepage.module.css";
import heroImage from "../../assets/images/hero.jpg";

import { useState, useEffect } from "react";

function HomePage() {
    useDocumentTitle('home');
    const [tags, setTags] = useState([]);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState("default")
    const [query, setQuery] = useState("");

    useEffect(() => {
        const getTags = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/posts/tags', {
                    method: 'GET',
                    credentials: 'include',
                })

                const data = await response.json();

                if (response.ok) {
                    setTags(data)
                } else {
                    setError('Error fetching tags: ', data.message);
                }
            }
            catch (err) {
                setError('Error: ' + err)
            }
        }
        getTags()
    }, [])

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    }

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
                <section className={styles.postPreviewWrapper}>
                    <h2>Available <span>dev</span> blog articles:</h2>
                    <div className={styles.filterContainer}>
                        <input type="text" name="query" id="query" onChange={handleQueryChange}/>
                        <select name="category" id="category" onChange={handleCategoryChange}>
                            <option value="default">All categories</option>
                            {tags.map(tag => {
                                return <option key={tag.id} value={tag.name}>{tag.name}</option>
                            })}
                        </select>
                    </div>
                    <PostPreview category={category} query={query} />
                </section>
            </main>
            <Footer />
        </>
    )
}

export default HomePage;
