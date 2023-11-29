import React, { createContext, useState, useEffect } from "react";
import { getInstallation } from "../../StrapiClient/strapi";
import NotInstalled from "../Dashboard/NotInstalled";

// Create Context
export const AuthContext = createContext();

// Create Provider
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(undefined);
  const [installation, setInstallation] = useState(undefined);
  const [showNotInstalled, setShowNotInstalled] = useState(false);
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
    if (auth) {
      const fetchInstallation = async () => {
        const newInstallation = await getInstallation({
          jwt: auth.jwt,
          repositories: true,
          repositoryConfigs: true,
        });

        setInstallation(newInstallation);
        return newInstallation;
      };

      fetchInstallation().then((installation) => {
        if (installation) {
          return;
        }
        fetchInstallation().then((installation) => {
          if (installation) {
            return;
          }
          fetchInstallation().then((installation) => {
            if (installation) {
              return;
            }
            setShowNotInstalled(true);
          });
        });
      });
    }
  }, [auth]);

  const saveAuthState = async (auth) => {
    if (auth.user.githubID) {
      setAuth(auth);
      localStorage.setItem("auth", JSON.stringify(auth));
      return;
    }
    const githubUser = await fetch(
      `https://api.github.com/users/${auth.user.username}`
    ).then((res) => res.json());
    const githubID = githubUser.id;
    setAuth({
      jwt: auth.jwt,
      user: { ...auth.user, githubID: githubID },
    });
    localStorage.setItem(
      "auth",
      JSON.stringify({
        jwt: auth.jwt,
        user: { ...auth.user, githubID: githubID },
      })
    );
  };

  const logOut = () => {
    localStorage.removeItem("auth");
    setInstallation(undefined);
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
      }}
    >
      <>
        {auth && (
          <NotInstalled
            githubID={auth.user.githubID}
            setShow={setShowNotInstalled}
            show={showNotInstalled}
          />
        )}
        {children}
      </>
    </AuthContext.Provider>
  );
};
