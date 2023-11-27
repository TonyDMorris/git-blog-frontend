import React from "react";
import cronstrue from "cronstrue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Configurations = ({ configurations }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-3xl p-4  m-2 border  rounded-lg shadow md:p-8 bg-slate-900 border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-white">
          Blog Post Configurations
        </h5>
        <button
          onClick={() => {
            navigate(`/repository-configuration`);
          }}
          className="flex relative  gap-1 bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded hover:cursor-pointer items-center"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Create</span>
          {configurations.length === 0 && (
            <span className="animate-ping absolute top-0 right-0 inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
          )}
        </button>
      </div>
      <div className="flow-root">
        <ul className="divide-y  divide-gray-200 md:p-0">
          {configurations &&
            configurations.map((configuration) => {
              const repoOwner =
                configuration.attributes.repository.data.attributes.name.split(
                  "/"
                )[0];
              return (
                <Configuration
                  key={configuration.id}
                  repoOwner={repoOwner}
                  id={configuration.id}
                  fullName={
                    configuration.attributes.repository.data.attributes
                      .full_name
                  }
                  cron={configuration.attributes.cron}
                  privatePosts={configuration.attributes.private}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Configurations;

const Configuration = ({ repoOwner, cron, fullName, id, privatePosts }) => {
  const navigate = useNavigate();
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
          <p className="hidden md:block text-sm  truncate text-gray-200">
            DIFF MONSTER is configured to generate a blog post <br />
          </p>
          <p className="text-sm  truncate text-gray-400">
            {cronstrue.toString(cron, { verbose: true })}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-white">
          {privatePosts ? "Private" : "Public"}
          <FontAwesomeIcon
            onClick={() => {
              navigate(`/repository-configuration`, {
                state: {
                  id: id,
                  cron: cron,
                  privatePosts: privatePosts,
                  fullName: fullName,
                },
              });
            }}
            className="text-white w-4 h-4 ml-2 hover:cursor-pointer "
            icon={faGear}
          />
        </div>
      </div>
    </li>
  );
};
