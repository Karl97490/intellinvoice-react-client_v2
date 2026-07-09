import { createContext } from "react";

const AuthContext = createContext();

const AuthProviderWrapper = (props) => {
  return (
    <AuthContext.Provider value={undefined}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProviderWrapper };
