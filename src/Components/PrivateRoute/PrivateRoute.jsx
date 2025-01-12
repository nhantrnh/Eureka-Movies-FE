import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
const PrivateRoute = ({ children }) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default PrivateRoute;