// AuthContext.js
import React, { createContext, useState } from "react";
import { loginUser } from "../api/services/Api";

const AuthContext = createContext({
  isLoggedIn: false,
  currentUser: null,
  login: (username: string, password: string) => Promise<void>,
  logout: () => {},
});

const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const login = async (username: string, password: string) => {
    try {
      const user = await loginUser(username, password);
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
      } else {
        throw new Error("Credenciales inválidas");
      }
    } catch (error) {
      throw new Error("Error de inicio de sesión");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const authContextValue: any = {
    isLoggedIn,
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
