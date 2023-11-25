import React, { useContext, useEffect, useState } from "react";
import Particle from "../Particle";
import { getInstallation } from "../../StrapiClient/strapi";
import { AuthContext } from "../Auth/AuthContext";
import ErrorModal from "../ErrorModal";
import NotInstalled from "./NotInstalled";

const Dashboard = () => {
  const [installation, setInstallation] = useState(undefined);
  const { auth } = useContext(AuthContext);

  const [error, setError] = useState(undefined);
  const [showError, setShowError] = useState(false);
  const [showNotInstalled, setShowNotInstalled] = useState(false);

  useEffect(() => {
    if (auth) {
      return getInstallation(auth.jwt)
        .then((installation) => {
          if (!installation) {
            setShowNotInstalled(true);
            return;
          }
          setInstallation(installation);
        })
        .catch((err) => {
          setError(err.message);
          setShowError(true);
        });
    }
  }, [auth]);
  return (
    <div>
      <Particle />
      <ErrorModal setShow={setShowError} show={showError} error={error} />
      {auth && (
        <NotInstalled
          githubID={auth.user.githubID}
          setShow={setShowNotInstalled}
          show={showNotInstalled}
        />
      )}
      {installation && <Installed installation={installation}></Installed>}
    </div>
  );
};

const Installed = ({ installation }) => {
  return (
    <div>
      <h1>Installed</h1>
      <p>{installation.id}</p>
      <p>{installation.username}</p>
      <p>{installation.attributes.repositories.data.length}</p>
    </div>
  );
};

export default Dashboard;
