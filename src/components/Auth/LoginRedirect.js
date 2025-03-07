import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const backendUrl = "https://strapi.evertech.software";

const LoginRedirect = (props) => {
  const [text, setText] = useState("Loading...");
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const { auth, saveAuthState, installation } = useContext(AuthContext);

  useEffect(() => {
    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search

    fetch(
      `${backendUrl}/api/auth/${params.providerName}/callback${location.search}`
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.json()}`);
        }

        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        saveAuthState({
          jwt: res.jwt,
          user: res.user,
        });
        setText("Redirecting to dashboard...");

        // Redirect to homepage after 3 sec
      })
      .catch((err) => {
        console.log(err);
        setText("An error occurred, please see the developer console.");
      });
  }, [navigate, location, location.search, params.providerName, saveAuthState]);

  useEffect(() => {
    if (auth && installation) {
      navigate("/dashboard");
    }
  }, [auth, installation]);

  return (
    <h1 className="h-screen w-full text-center text-3xl font-bold text-gray-200">
      {text}
    </h1>
  );
};

export default LoginRedirect;
