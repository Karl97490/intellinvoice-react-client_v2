import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";

const OnlyPrivate = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // if not user logged in redirect to login page
  }

  return <Outlet />; // if user logged in show privates routes
};

export default OnlyPrivate;
