import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ allowedRoles, children }) {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to="/unauthorized" replace />;
  }

  let userRole = null;
  try {
    const decoded = jwtDecode(token);
    userRole = decoded.role || null;
    console.log('Decoded Role:', userRole);
  } catch (err) {
    console.error(" Token decode lỗi:", err);
    return <Navigate to="/unauthorized" replace />;
  }

  console.log('Allowed Roles:', allowedRoles);

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;