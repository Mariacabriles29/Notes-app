import React, { createContext, useState } from "react";
import axios from "axios";

export interface User {
  id: string;
  username: string;
  password: string;
  status: string;
}

interface UserContextProps {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  login: () => Promise.resolve(false),
  logout: () => {},
});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await axios.get("http://localhost:3001/users");

      const currentUser = response.data.find((us: User) => {
        if (us.username === username && us.password === password) return us;
      });

      if (currentUser && response.status === 200) {
        setUser({
          id: currentUser.id,
          username,
          password,
          status: "authenticated",
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error en la solicitud de inicio de sesión:", error);
      return false;
    }
  };

  const logout = (): void => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
