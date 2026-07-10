import { createContext, useState } from "react";
import authService from "../services/auth.service";

const AuthContext = createContext();

const AuthProviderWrapper = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = async () => {
    const token = localStorage.getItem("authToken");
    // Avoid to call the server
    if (!token) {
      console.log("user not logged in");
      setUser(null);
      setIsLoggedIn(false);
    }
    try {
      const response = await authService.verify();
      setUser(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error.response);
      console.log("user not logged in");
      throw error;
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  const stateContext = {
    storeToken,
    authenticateUser,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={stateContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProviderWrapper };
