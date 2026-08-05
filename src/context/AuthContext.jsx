import {
  createContext,
  useEffect,
  useState
} from "react";

import api from "../services/api";

export const AuthContext =
  createContext();

export const AuthProvider = ({
  children
}) => {

  const [user, setUser] =
    useState(null);

  const loadUser = async () => {

    const token =
      localStorage.getItem("token");

    if (!token) return;

    try {

      const res =
        await api.get("/users/me");

      setUser(
        res.data.data
      );

    } catch (err) {

      console.log(err);

      logout();

    }

  };

  useEffect(() => {

    loadUser();

  }, []);

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("refreshToken");

    setUser(null);

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        setUser,
        loadUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>

  );

};