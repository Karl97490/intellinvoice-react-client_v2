import { createContext, useEffect, useState } from "react";
import authService from "../services/auth.service";
import { Spinner } from "flowbite-react";

const AuthContext = createContext();

const AuthProviderWrapper = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authenticateUser();
  }, []);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = async () => {
    const token = localStorage.getItem("authToken");
    // Avoid to call the server
    if (!token) {
      console.log("user not logged in");
      setIsLoading(false);
      setUser(null);
      setIsLoggedIn(false);
    }
    try {
      const response = await authService.verify();
      setIsLoading(false);
      setUser(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error.response);
      console.log("user not logged in");
      throw error;
      setIsLoading(false);
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  const stateContext = {
    storeToken,
    authenticateUser,
    isLoggedIn,
  };

  if (isLoading) {
    return (
      <>
        <div className="mx-auto flex flex-col gap-2 items-center">
          <Spinner aria-label="App loading spinner" size="xl" />
          <span className="text-md">Loading...</span>
        </div>
      </>
    );
  }

  return (
    <AuthContext.Provider value={stateContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProviderWrapper };
