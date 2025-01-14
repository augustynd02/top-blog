import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/session`, {
                method: 'DELETE',
                credentials: 'include'
            })
            await response.json();
            navigate(-1);
        }
        logout();
    }, [])
}

export default LogoutPage;
