import { createContext, useContext, useState, useEffect } from 'react';
import * as authApi from '../api/auth';

const AuthContext = createContext(null);

// Provider component for managing authentication state
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch the authenticated user on component mount
    useEffect(() => {
        authApi.getUser()
            .then((response) => setUser(response.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    // Function to handle user login
    const login = async (credentials) => {
        await authApi.getCsrfCookie();
        await authApi.login(credentials);
        const response = await authApi.getUser();
        setUser(response.data);
    };

    // Function to handle user registration
    const register = async (data) => {
        await authApi.getCsrfCookie();
        await authApi.register(data);
        const response = await authApi.getUser();
        setUser(response.data);
    };

    // Function to handle user logout
    const logout = async () => {
        await authApi.logout();
        setUser(null);
    };

    // Provide the authentication state and functions to child components
    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to access the authentication context
export function useAuth() {
    return useContext(AuthContext);
}