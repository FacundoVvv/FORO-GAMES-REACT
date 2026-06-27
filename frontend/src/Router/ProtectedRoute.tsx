import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@Contexts/Auth_context";

export const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user.isLogged) return <Navigate to="/login" replace />;

  return <Outlet />;
};