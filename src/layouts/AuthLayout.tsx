import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/lib/stores/auth.store';

export function AuthLayout() {
  const { user } = useAuthStore();
  const location = useLocation();

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Outlet />
    </div>
  );
}