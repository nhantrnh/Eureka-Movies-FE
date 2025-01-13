import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {    
    if (accessToken) {
      navigate("/");
    }
  }, [navigate]);

  return children;
};

export default PublicRoute;