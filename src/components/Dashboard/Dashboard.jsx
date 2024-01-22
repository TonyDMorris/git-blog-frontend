import React, { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import Configurations from "../RepositoryConfigurations/Configurations";

const Dashboard = () => {
  const { installation } = useContext(AuthContext);

  return (
    <div className="flex items-start py-5 justify-center min-h-screen">
      {installation && <Installed></Installed>}
    </div>
  );
};

const Installed = () => {
  return (
    <div className="w-full max-w-3xl p-4  m-2 border  rounded-lg shadow md:p-8 bg-slate-900 border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-white">
          This is the dashboard
        </h5>
      </div>
    </div>
  );
};

export default Dashboard;
