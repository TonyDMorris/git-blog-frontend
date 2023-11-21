import React, { createContext, useState, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// Create Provider
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  // Simulate an async function to fetch auth state
  useEffect(() => {
    const fetchAuthState = async () => {
      // Replace this with your actual logic to fetch auth state
      const authState = await Promise.resolve({ isAuthenticated: false });
      setAuth(authState);
    };

    fetchAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
