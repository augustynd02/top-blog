import useDocumentTitle from '../../hooks/useDocumentTitle';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function RegisterPage() {
    useDocumentTitle('register');
    return (
        <>
            <Header />
            <main>
                <h2>Register</h2>
                <form action="http://localhost:3000/api/users" method="POST">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" />

                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" id="password" />

                    <button type="submit">Submit</button>
                </form>
            </main>
            <Footer />
        </>
    )
}

export default RegisterPage;
