import { useEffect, useState } from 'react';

function useAuth() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function checkLoginStatus() {
            try {
                setIsLoading(true);
                await new Promise(resolve => setTimeout(resolve, 1000));
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
                setIsLoading(false);
            } catch (err) {
                console.error('Error with login status: ', err)
                setIsLoading(false);
                setUser(null);
            }
        }
        checkLoginStatus();
    }, [])

    return { user, setUser, isLoading };
}

export default useAuth;
