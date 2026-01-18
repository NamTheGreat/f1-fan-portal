import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const register = async (userData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', userData);
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                setUser(response.data);
            }
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (userData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', userData);
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                setUser(response.data);
            }
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, error, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
