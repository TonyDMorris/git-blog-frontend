import React, { createContext, useState, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// Create Provider
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(undefined);

  // Simulate an async function to fetch auth state
  useEffect(() => {
    const fetchAuthState = async () => {
      const auth = localStorage.getItem("auth");
      console.log(auth);
      if (auth) {
        const newAuth = JSON.parse(auth);
        if (newAuth.user.githubID) {
          setAuth(newAuth);
          return;
        }
        const githubUser = await fetch(
          `https://api.github.com/users/${newAuth.user.username}`
        ).then((res) => res.json());
        const githubID = githubUser.id;
        setAuth({
          jwt: newAuth.jwt,
          user: { ...newAuth.user, githubID: githubID },
        });
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
