import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export function PrivateRoute({ children, requiredRole = null }) {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <div>Verificando autorización...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace/>;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unauthorized" replace/>;
    }

    return children;

};