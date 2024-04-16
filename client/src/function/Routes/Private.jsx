import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "../../pages/public/Login";

const Private = () => {
  const navigate = useNavigate();
  // Explicitly define the type of 'state' using the RootState interface
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (isAuthenticated === null) {
        setLoading(true);
        return;
      }

      setLoading(false);
    };

    checkAuthentication();
  }, [isAuthenticated, navigate]); // Dependency array to ensure useEffect() runs only when needed

  // Show loading indicator while waiting for authentication check
  if (loading) return "Loading....";

  // Show outlet if authenticated, otherwise redirect to login
  return isAuthenticated ? <Outlet /> : <Login />;
};

export default Private;
