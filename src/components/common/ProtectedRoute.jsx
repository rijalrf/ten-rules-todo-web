import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Kalau nggak ada token, tendang ke halaman login
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;