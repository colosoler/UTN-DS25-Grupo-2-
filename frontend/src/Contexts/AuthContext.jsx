import { createContext, useState, useContext, useEffect } from 'react';
import { getToken, setToken, clearToken, getUser, setUser as setLocalUser, clearUser, parseJWT, isTokenExpired } from '../Helpers/auth';

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const token = getToken();
        if (token && !isTokenExpired()){
            const user = getUser();
            setUser(user);
        }else if (token){
            clearToken();
            clearUser();
        }
        setLoading(false);
    }, []);

    const persistSession = (token) => {
        setToken(token);
        const userData = parseJWT(token);
        setUser(userData);
        setLocalUser(userData);
    };

    const extractErrorMessage = async (res, fallbackMessage) => {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || fallbackMessage);
    };

    const login = async (data) => {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) await extractErrorMessage(res, "Correo o contraseña inválidos");

            const { data: responseData } = await res.json();
            persistSession(responseData.token);
            return { success: true};
        } catch (error){
            return { success: false, error: error.message };
        }
    };

    const loginWithGoogle = async (credential) => {
        try {
            const res = await fetch(`${API_URL}/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ credential }),
            });

            if (!res.ok) await extractErrorMessage(res, "No se pudo iniciar sesión con Google");

            const { data: responseData } = await res.json();
            persistSession(responseData.token);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const signup = async (data) => {
    try {
        const res = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...data,
                careerId: parseInt(data.career, 10),
            }),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || "Error en el registro");
        }

        const result = await res.json();

        if (result.success && result.data?.token) {
            persistSession(result.data.token);
            const userData = parseJWT(result.data.token);
            return { success: true, user: userData, token: result.data.token };
        }

        return { success: false, error: "No se recibió token" };
    } catch (err) {
        return { success: false, error: err.message };
    }
};

    const signupWithGoogle = async ({ credential, career }) => {
        try {
            const careerId = parseInt(career, 10);
            if (Number.isNaN(careerId)) {
                throw new Error("Debe seleccionar una carrera válida");
            }

            const res = await fetch(`${API_URL}/signup/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    credential,
                    careerId,
                }),
            });

            if (!res.ok) await extractErrorMessage(res, "No se pudo registrar la cuenta con Google");

            const result = await res.json();

            if (result.success && result.data?.token) {
                persistSession(result.data.token);
                const userData = parseJWT(result.data.token);
                return { success: true, user: userData, token: result.data.token };
            }

            return { success: false, error: "No se recibió token" };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };



    const logout = () => {
        clearToken();
        clearUser();
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
        loginWithGoogle,
        logout,
        signup,
        signupWithGoogle,
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