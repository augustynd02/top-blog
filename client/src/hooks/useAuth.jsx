import { useEffect, useState } from 'react';

function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function checkLoginStatus() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/session`, {
                    method: 'GET',
                    credentials: 'include',
                })

                const data = await response.json();
                if (data.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error('Error with login status: ', err)
                setUser(null);
            }
        }
        checkLoginStatus();
    }, [])

    return { user, setUser};
}

export default useAuth;
