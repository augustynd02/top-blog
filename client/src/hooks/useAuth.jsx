import { useEffect, useState } from 'react';

function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function checkLoginStatus() {
            try {
                const response = await fetch('http://localhost:3000/api/auth/check-login', {
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

    return user;
}

export default useAuth;
