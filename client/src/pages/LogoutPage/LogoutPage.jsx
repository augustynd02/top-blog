import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const response = fetch('http://localhost:3000/api/auth/session', {
            method: 'DELETE',
            credentials: 'include'
        })
        navigate(-1);
    }, [])
}

export default LogoutPage;
