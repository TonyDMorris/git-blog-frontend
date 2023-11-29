import React, { createContext, useState, useEffect } from "react";
import { getInstallation } from "../../StrapiClient/strapi";

// Create Context
export const AuthContext = createContext();

// Create Provider
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(undefined);
  const [installation, setInstallation] = useState(undefined);
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
  // Simulate an async function to fetch auth state
  useEffect(() => {
    fetchAuthState();
  }, []);

  useEffect(() => {
    const fetchInstallation = async () => {
      const installation = await getInstallation({
        jwt: auth.jwt,
        repositories: true,
        repositoryConfigs: true,
      });
      setInstallation(installation);
    };

    if (auth) {
      fetchInstallation();
    }
  }, [auth]);

  const saveAuthState = (auth) => {
    localStorage.setItem("auth", JSON.stringify(auth));
    setAuth(auth);
  };

  const logOut = () => {
    localStorage.removeItem("auth");
    setAuth(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        saveAuthState,
        logOut,
        installation,
        setInstallation,
        refresh: fetchAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
