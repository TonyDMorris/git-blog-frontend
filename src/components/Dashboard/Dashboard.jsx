import React, { useContext, useEffect, useState } from "react";
import Particle from "../Particle";
import { getInstallation } from "../../StrapiClient/strapi";
import { AuthContext } from "../Auth/AuthContext";
import ErrorModal from "../ErrorModal";
import NotInstalled from "./NotInstalled";
import Configurations from "./Configurations";

const Dashboard = () => {
  const { installation } = useContext(AuthContext);

  return (
    <div className="flex items-start py-5 justify-center min-h-screen">
      {installation && <Installed></Installed>}
    </div>
  );
};

const Installed = () => {
  return <Configurations></Configurations>;
};

export default Dashboard;
