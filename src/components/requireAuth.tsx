import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

export default function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();

  return auth.user ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
}
