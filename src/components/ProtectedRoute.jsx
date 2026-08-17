import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, roles }) {
    const { user, loading, hasRole } = useAuth();

    if (loading) return <p>Cargando...</p>;

    if (!user) return <Navigate to="/login" replace />;

    if (roles && !roles.some((role) => hasRole(role))) {
        return <Navigate to="/products" replace />;
    }

    return children;
}