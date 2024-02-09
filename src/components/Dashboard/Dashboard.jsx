import React, { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import Configurations from "../RepositoryConfigurations/Configurations";

const Dashboard = () => {
  const { installation } = useContext(AuthContext);

  return <>{installation && <Installed></Installed>}</>;
};

const Installed = () => {
  return <h5 className="font-bold text-white">This is the dashboard</h5>;
};

export default Dashboard;
