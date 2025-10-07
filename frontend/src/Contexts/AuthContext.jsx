import { createContext, useState, useContext, useEffect } from 'react';
import { getToken, setToken, clearToken, getUser, parseJWT, isTokenExpired } from '../Helpers/auth';

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (token && !isTokenExpired()){
            const user = getUser();
            setUser(user);
        }else if (token){
            clearToken();
        }
        setLoading(false);
    }, []);

    const login = async (data) => {
        try {
            const res = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Correo o contraseña inválidos");

            const { data: responseData } = await res.json();
            setToken(responseData.token);

            const user = parseJWT(responseData.token)
            setUser(user);
            return { success: true};
        } catch (error){
            return { success: false, error: error.message };
        }
    };

    const signup = async (data) => {
    try {
        const res = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...data,
                careerId: parseInt(data.career, 10),
            }),
        });

        if (!res.ok) throw new Error("Error en el registro");

        const result = await res.json();

        if (result.success && result.data?.token) {
            const userData = parseJWT(result.data.token);
            setToken(result.data.token);
            setUser(userData);
            return { success: true, user: userData, token: result.data.token };
        }

        return { success: false, error: "No se recibió token" };
    } catch (err) {
        return { success: false, error: err.message };
    }
};



    const logout = () => {
        clearToken();
        setUser(null);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (isTokenExpired()){
                logout();
            }
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const value = {
        user,
        login,
        logout,
        signup,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
        isUser: user?.role === 'USER',
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
}