import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";

const OnlyPublic = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return <Navigate to="/clients" replace />;
  }

  return <Outlet />;
};

export default OnlyPublic;
