import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/auth/session', {
                    method: 'DELETE',
                    credentials: 'include'
                })
                const data = await response.json();
                console.log(data);
            } catch (err) {
                console.log(err);
            }
            navigate(-1);
        }
        logout();
    }, [])
}

export default LogoutPage;
