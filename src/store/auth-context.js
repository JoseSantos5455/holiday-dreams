import React from "react";
import useFirebase from "../hooks/useFirebase";

//Creating context and give default value
export const AuthContext = React.createContext({
  user: {},
  error: "",
  loading: true,
  signInUsingGoogle: (redirectPath) => { },
  signInUsingFacebook: (redirectPath) => { },
  registerUser: (name, email, password) => { },
  loginUser: (email, password) => { },
  logout: () => { },
});
//Provide context value
const AuthContextProvider = ({ children }) => {
  const value = useFirebase();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
