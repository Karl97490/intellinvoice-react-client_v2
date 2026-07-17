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

  const logout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  const authenticateUser = async () => {
    const token = localStorage.getItem("authToken");
    // Avoid to call the server
    if (!token) {
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
      setIsLoading(false);
      setUser(null);
      setIsLoggedIn(false);
      throw error;
    }
  };

  const stateContext = {
    storeToken,
    authenticateUser,
    isLoggedIn,
    user,
    logout,
  };

  if (isLoading) {
    return (
      <>
        <div className="flex min-h-screen w-full items-center justify-center">
          <div className="mx-auto flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <Spinner aria-label="Redirecting loading spinner" size="xl" />
            <span className="text-md font-medium text-gray-700 dark:text-gray-200">
              Loading...
            </span>
          </div>
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
