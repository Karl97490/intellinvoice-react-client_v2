import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProviderWrapper = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const stateContext = {
    user,
    isLoggedIn,
    isLoading,
    storeToken,
  };

  return (
    <AuthContext.Provider value={stateContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProviderWrapper };
