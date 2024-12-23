import useDocumentTitle from '../../hooks/useDocumentTitle';
import useAuth from '../../hooks/useAuth';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import styles from './AdminPage.module.css';

import addIcon from '../../assets/icons/add.svg';
import analyticsIcon from '../../assets/icons/analytics.svg';
import listIcon from '../../assets/icons/list.svg';

function AdminPage() {
    useDocumentTitle('admin')
    const { user } = useAuth();
    if (!user || user.role_id != 2) {
        return <div>Not an admin</div>
    }
    return (
        <>
            <Header />
            <div className={styles.adminWrapper}>
                <div className={styles.actionsContainer}>
                    <ul>
                        <li><img src={addIcon} alt="Add icon" /></li>
                        <li><img src={listIcon} alt="List icon" /></li>
                        <li><img src={analyticsIcon} alt="Analytics icon" /></li>
                    </ul>
                </div>
                <main>

                </main>
            </div>
            <Footer />
        </>
    )
}

export default AdminPage;
