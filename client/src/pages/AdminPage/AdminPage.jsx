import useDocumentTitle from '../../hooks/useDocumentTitle';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PostCreator from '../../components/PostCreator/PostCreator';
import PostEditor from '../../components/PostEditor/PostEditor';
import PostList from '../../components/PostList.jsx/PostList';
import PostAnalytics from '../../components/PostAnalytics/PostAnalytics';


import { MdAdd, MdList, MdAnalytics } from 'react-icons/md';

import styles from './AdminPage.module.css';

function AdminPage() {
    useDocumentTitle('admin')
    const [currentSection, setCurrentSection] = useState('list');
    const [currentPost, setCurrentPost] = useState();
    const switchToEdit = (post) => {
        setCurrentSection('edit');
        setCurrentPost(post)
    }
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
                        <li onClick={() => {setCurrentSection('create')}}><MdAdd /></li>
                        <li onClick={() => {setCurrentSection('list')}}><MdList /></li>
                        <li onClick={() => {setCurrentSection('analytics')}}><MdAnalytics /></li>
                    </ul>
                </div>
                <main className={styles.adminMain}>
                    {currentSection === 'create' && <PostCreator />}
                    {currentSection === 'list' && <PostList switchToEdit={switchToEdit} />}
                    {currentSection === 'analytics' && <PostAnalytics />}
                    {currentSection === 'edit' && <PostEditor currentPost={currentPost} />}
                </main>
            </div>
            <Footer />
        </>
    )
}

export default AdminPage;
