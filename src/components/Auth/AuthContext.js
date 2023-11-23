import React, { createContext, useState, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// Create Provider
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(undefined);

  // Simulate an async function to fetch auth state
  useEffect(() => {
    console.log(auth);
    const fetchAuthState = async () => {
      const auth = localStorage.getItem("auth");
      if (auth) {
        setAuth(JSON.parse(auth));
        return;
      }
    };

    fetchAuthState();
  }, []);

  const saveAuthState = (auth) => {
    localStorage.setItem("auth", JSON.stringify(auth));
    setAuth(auth);
  };

  return (
    <AuthContext.Provider value={{ auth, saveAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
