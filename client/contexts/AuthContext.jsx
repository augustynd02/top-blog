import { createContext } from 'react';
import useAuth from '../src/hooks/useAuth';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const user = useAuth()

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
