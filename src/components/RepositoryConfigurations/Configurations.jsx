import React, { useContext, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faPlus,
  faTrash,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import { DeleteRepoConfiguratiion } from "../../StrapiClient/strapi";

const Configurations = () => {
  const { installation } = useContext(AuthContext);
  const configurations = installation
    ? installation.attributes.repository_configurations.data
    : [];
  const navigate = useNavigate();
  const [possibleSelections, setPossibleSelections] = useState([]);

  useEffect(() => {
    if (installation) {
      const configRepoIDs =
        installation.attributes.repository_configurations.data.map((config) => {
          return config.attributes.repository.data.id;
        });
      const newPossibleSelections =
        installation.attributes.repositories.data.filter((repo) => {
          return configRepoIDs.indexOf(repo.id) === -1;
        });
      setPossibleSelections(newPossibleSelections);
    }
  }, [installation]);

  return (
    <>
      {installation && (
        <div className="flex items-start min-w-fit py-5 justify-center ">
          <div className="w-full max-w-3xl p-4  m-2 border  rounded-lg shadow md:p-8 bg-slate-900 border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl p-2 font-bold leading-none text-white">
                Blog Post Configurations
              </h5>
              {possibleSelections.length === 0 ? (
                <h5 className="text-sm font-bold leading-none text-green-700">
                  All available repositories are configured
                  <FontAwesomeIcon
                    className="text-green-700 w-4 h-4 ml-2"
                    icon={faCheck}
                  />
                </h5>
              ) : (
                <button
                  onClick={() => {
                    navigate(`/repository-configurations`);
                  }}
                  className="flex relative  gap-1 bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded hover:cursor-pointer items-center"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Create</span>
                  {configurations.length === 0 && (
                    <span className="animate-ping absolute top-0 right-0 inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                  )}
                </button>
              )}
            </div>
            <div className="flow-root">
              <ul className="divide-y  divide-gray-200 md:p-0">
                {configurations &&
                  configurations.map((configuration) => {
                    return (
                      <Configuration
                        key={configuration.id}
                        configuration={configuration}
                      />
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Configurations;

const Configuration = ({ configuration }) => {
  const navigate = useNavigate();
  const { auth, setInstallation } = useContext(AuthContext);
  if (!configuration) return <div></div>;

  const { id, attributes } = configuration;
  const { cron, repository, last_generation } = attributes;
  const privatePosts = attributes.private;
  const fullName = repository.data.attributes.full_name;
  const repoOwner = fullName.split("/")[0];

  return (
    <li className="py-3 sm:p-4">
      <div className="flex items-center ">
        <div className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full hidden md:block "
            src={`https://github.com/${repoOwner}.png`}
            alt="repo owner"
          />
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium truncate text-white">{fullName}</p>

          <p className="text-sm  truncate text-gray-400">Every {cron}</p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-white">
          {privatePosts ? "Private" : "Public"}
          <FontAwesomeIcon
            onClick={() => {
              navigate(`/repository-configurations/${id}`);
            }}
            className="text-white w-4 h-4 ml-2 hover:cursor-pointer "
            icon={faGear}
          />
          <FontAwesomeIcon
            onClick={() => {
              DeleteRepoConfiguratiion(id, auth.jwt).then(() => {
                setInstallation((prev) => {
                  const newConfigurations =
                    prev.attributes.repository_configurations.data.filter(
                      (config) => {
                        return config.id !== id;
                      }
                    );
                  return {
                    ...prev,
                    attributes: {
                      ...prev.attributes,
                      repository_configurations: {
                        data: newConfigurations,
                      },
                    },
                  };
                });
              });
            }}
            className="text-red-600 w-4 h-4 ml-2 hover:cursor-pointer"
            icon={faTrash}
          />
        </div>
      </div>
    </li>
  );
};
