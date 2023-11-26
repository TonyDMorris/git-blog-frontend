import React from "react";
import cronstrue from "cronstrue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const Configurations = ({ configurations }) => {
  return (
    <div className="w-full max-w-3xl p-4  border  rounded-lg shadow md:p-8 bg-gray-800 border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-white">
          Blog Post Configurations
        </h5>
        {/* <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline text-blue-500"
        >
          View all
        </a> */}
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

const Configuration = ({ repoOwner, cron, fullName, privatePosts }) => {
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
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {fullName}
          </p>
          <p className="hidden md:block text-sm text-gray-500 truncate dark:text-gray-400">
            DIFF MONSTER is configured to generate a blog post <br />
          </p>
          <p className=" text-sm text-gray-500 truncate dark:text-gray-400">
            {cronstrue.toString(cron, { verbose: true })}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {privatePosts ? "Private" : "Public"}
          <FontAwesomeIcon className="text-white w-4 h-4 ml-2" icon={faGear} />
        </div>
      </div>
    </li>
  );
};
