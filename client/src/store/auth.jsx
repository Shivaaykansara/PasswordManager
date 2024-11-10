/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [prevPass, setPrevPass] = useState([]);
  const API = `http://localhost:5000/api`;
  const storeTokenInLS = (token) => {
    setToken(token);
    return localStorage.setItem("token", token);
  };
  const [loggedUserData, setLoggedUserData] = useState("");
  let isLoggedIn = !!token;

  const Logout = () => {
    setToken("");
    setLoggedUserData("");
    setPrevPass([]);
    localStorage.removeItem("token");
  };

  const userLogged = async () => {
    const response = await fetch(`${API}/manager/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const res_Data = await response.json();
      setPrevPass(res_Data);
    }
  };

  const authenticate = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${API}/auth/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const res_Data = await response.json();
        // console.log(res_Data)
        setLoggedUserData(res_Data);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };
  useEffect(() => {
    if (token) {
      authenticate();
      userLogged();
    } else {
      setLoggedUserData("");
      setPrevPass([]);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        API,
        token,
        loggedUserData,
        storeTokenInLS,
        isLoggedIn,
        Logout,
        prevPass,
        userLogged,
        setPrevPass,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside the Provider");
  }
  return authContextValue;
};
