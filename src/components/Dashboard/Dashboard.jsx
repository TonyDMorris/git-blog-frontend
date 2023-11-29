import React, { useContext, useEffect, useState } from "react";
import Particle from "../Particle";
import { getInstallation } from "../../StrapiClient/strapi";
import { AuthContext } from "../Auth/AuthContext";
import ErrorModal from "../ErrorModal";
import NotInstalled from "./NotInstalled";
import Configurations from "./Configurations";

const Dashboard = () => {
  const { auth, installation } = useContext(AuthContext);

  const [showNotInstalled, setShowNotInstalled] = useState(false);

  return (
    <div className="flex items-start py-5 justify-center min-h-screen">
      {auth && (
        <NotInstalled
          githubID={auth.user.githubID}
          setShow={setShowNotInstalled}
          show={showNotInstalled}
        />
      )}
      {installation && <Installed></Installed>}
    </div>
  );
};

const Installed = () => {
  return <Configurations></Configurations>;
};

export default Dashboard;
