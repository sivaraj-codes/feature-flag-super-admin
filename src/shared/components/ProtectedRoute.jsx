import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FullPageSpinner } from "./FullPageSpinner";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

  // still fetching /auth/me
  if (loading) return <FullPageSpinner />;

  // not logged in
  if (!user) return <Navigate to="/login" replace />;

  // wrong role
  if (allowedRole && user.roleId !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
