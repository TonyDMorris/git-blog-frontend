import React, { useContext, useEffect, useState } from "react";
import Particle from "../Particle";
import { getInstallation } from "../../StrapiClient/strapi";
import { AuthContext } from "../Auth/AuthContext";
import ErrorModal from "../ErrorModal";
import NotInstalled from "./NotInstalled";
import Configurations from "./Configurations";

const Dashboard = () => {
  const [installation, setInstallation] = useState(undefined);
  const { auth } = useContext(AuthContext);

  const [error, setError] = useState(undefined);
  const [showError, setShowError] = useState(false);
  const [showNotInstalled, setShowNotInstalled] = useState(false);

  useEffect(() => {
    if (auth) {
      return getInstallation({ jwt: auth.jwt, repositoryConfigs: true })
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
    <div className="flex items-start py-5 justify-center min-h-screen">
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
    <Configurations
      configurations={installation.attributes.repository_configurations.data}
    ></Configurations>
  );
};

export default Dashboard;
