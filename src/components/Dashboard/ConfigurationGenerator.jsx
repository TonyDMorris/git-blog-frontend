import React, { useEffect, useState, useContext } from "react";
import Cron from "react-cron-generator";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import ErrorModal from "../ErrorModal";
import { getInstallation } from "../../StrapiClient/strapi";

const ConfigurationGenerator = (configuration) => {
  const { state } = useLocation();
  console.log(state);
  const [locked, setLocked] = useState(false);
  const [repo, setRepo] = useState(undefined);

  useEffect(() => {
    if (state) {
      setLocked(true);
      setRepo({ id: state.id, fullName: state.fullName, cron: state.cron });
    }
  }, [state]);
  return (
    <div className="flex justify-center items-start mb-4 h-screen p-4">
      <div className="flex flex-col  text-white justify-center items-center w-full max-w-3xl p-4   m-2 border  rounded-lg shadow md:p-8 bg-slate-900 border-slate-800">
        <RepoSelection locked={locked} fullName={repo?.fullName} />
        Frequency Configuration
        <Cron
          onChange={(e) => {
            setRepo({ ...repo, cron: e });
          }}
          value={repo?.cron || "* * * * *"}
          showResultText={true}
        />
      </div>
    </div>
  );
};

const RepoSelection = ({ locked, fullName }) => {
  const { auth } = useContext(AuthContext);
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState(undefined);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (locked) {
      return;
    }
    if (auth) {
      return getInstallation({ jwt: auth.jwt, repositories: true })
        .then((installation) => {
          setRepositories(installation.attributes.repositories.data);
        })
        .catch((err) => {
          setError(err.message);
          setShowError(true);
        });
    }
  }, [auth, locked]);

  return (
    <div className="flex justify-center mb-4 w-full">
      <ErrorModal setShow={setShowError} show={showError} error={error} />

      <label
        for="repositories"
        className="block mb-2 text-sm font-medium  text-white"
      >
        {locked ? "Selected Repository" : "Select a Repository"}
      </label>
      <select
        id="repositories"
        className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        disabled={locked}
      >
        {repositories.map((repo) => {
          return (
            <option
              key={repo.id}
              value={repo.attributes.full_name}
              selected={repo.attributes.full_name === fullName}
            >
              {repo.attributes.full_name}
            </option>
          );
        })}
        {locked && (
          <option value={fullName} selected={true}>
            {fullName}
          </option>
        )}
      </select>
    </div>
  );
};

export default ConfigurationGenerator;
