import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  // Function to store the token in local storage and update state
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);  // This triggers reactivity in isLoggedIn
  };

  // Function to handle logout
  const LogoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setToken("");  // This also triggers reactivity in isLoggedIn
  };

  // Update isLoggedIn whenever token changes
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
