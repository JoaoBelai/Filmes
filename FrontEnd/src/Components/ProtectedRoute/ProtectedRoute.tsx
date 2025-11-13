import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

const ProtectedRoute = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return null; 
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;