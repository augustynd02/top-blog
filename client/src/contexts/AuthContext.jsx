import { createContext } from 'react';
import useAuth from '../hooks/useAuth';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const { user, setUser, isLoading } = useAuth();

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
