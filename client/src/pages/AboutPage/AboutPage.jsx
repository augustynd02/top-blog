import styles from './aboutpage.module.css';
import avatar from '../../assets/images/avatar.jpg';
import { useRef } from 'react';

function AboutPage() {

    return (
        <main className={styles.aboutWrapper}>
            <div className={styles.aboutContainer} >
                <h2>About <span className="highlight">me.</span></h2>
                <div className={styles.avatar}>
                    <img src={avatar} alt="Avatar" />
                </div>
                <p>
                    Hi, I&apos;m Dominik Augustyn, a passionate self-taught <span className="highlight">web developer</span> from Poland. Over the past two years, I&apos;ve immersed myself in <span className="highlight">coding</span> and exploring technologies in order to build engaging, functional, and modern <span className="highlight">web applications</span>. My journey began with curiosity and quickly evolved into a deep passion for <span className="highlight">creation</span>.
                </p>
                <p>
                    In 2023, I came across a video on social media showcasing some <span className="highlight">codebase</span> on screen - it looked very intimidating and complex. I love learning new things, and understanding something complicated gives me satisfaction and a sense of acomplishment. That&apos;s why I decided to dive into the <span className="highlight">web development</span> world - and it turned out to be my niche, a never ending well of <span className="highlight">knowledge</span>. Every time I learn about something new, whether it&apos;s a <span className="highlight">function</span>, a <span className="highlight">language</span> or a <span className="highlight">framework</span> - I discover more and more things that I do not know yet. And I love that!
                </p>
                <p>
                    I decided to turn this hobby into a passion. People online recommended me <span className="highlight">The Odin Project</span>. It&apos;s a free curriculum that guides you in the path to become a successful <span className="highlight">web developer</span>. It was a game-changer for me, as I was constantly stressed about whether I&apos;m going in the right direction with my studies or not.
                    </p>
                <p>
                    Now it&apos;s 2025, and the <span className="highlight">web development</span> community is growing larger and larger. Maybe you&apos;re a part of it! This blog is dedicated to other aspiring <span className="highlight">developers</span> with the same goal. I want to share my journey and experiences to <span className="highlight">inspire</span> and <span className="highlight">motivate</span> people on the same path.
                    </p>
            </div>
        </main>
    )
}

export default AboutPage;
