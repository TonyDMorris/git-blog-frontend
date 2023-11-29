import React, { useEffect, useState, useContext } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import ErrorModal from "../ErrorModal";
import { getInstallation } from "../../StrapiClient/strapi";

import SelectSearch from "react-select-search";
import { Button } from "react-bootstrap";
import {
  PutRepoConfiguratiion,
  PostRepoConfiguratiion,
} from "../../StrapiClient/strapi";

const ConfigurationGenerator = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { installation, auth, refresh } = useContext(AuthContext);
  const [repoID, setRepoID] = useState(null);
  const [cron, setCron] = useState(null);
  const [privatePosts, setPrivatePosts] = useState(false);
  const [locked, setLocked] = useState(false);
  const [possibleSelections, setPossibleSelections] = useState([]);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (installation && !id) {
      console.log(installation);

      setCron("2 weeks");
      setPrivatePosts(false);
      const configRepoIDs =
        installation.attributes.repository_configurations.data.map((config) => {
          return config.attributes.repository.data.id;
        });
      const newPossibleSelections =
        installation.attributes.repositories.data.filter((repo) => {
          return configRepoIDs.indexOf(repo.id) === -1;
        });
      if (newPossibleSelections && newPossibleSelections.length === 0) {
        setError(
          "You have already configured all of your repositories. Please delete a configuration to add a new one."
        );
        setShowError(true);
      }
      setPossibleSelections(newPossibleSelections);
      setRepoID(newPossibleSelections[0].id.toString());
    }

    if (installation && id) {
      const config =
        installation.attributes.repository_configurations.data.filter(
          (config) => config.id.toString() === id
        );

      setRepoID(config[0].attributes.repository.data.id.toString());
      setCron(config[0].attributes.cron);
      setPrivatePosts(config[0].attributes.private);
      setLocked(true);
    }
  }, [installation, id]);
  if (!installation) return null;
  return (
    <div className="flex justify-center items-start mb-4 h-screen p-4">
      <ErrorModal show={showError} setShow={setShowError} error={error} />
      <div className="flex flex-col gap-5 text-white  w-full max-w-3xl items-center justify-center  border  rounded-lg shadow p-8 bg-slate-900 border-slate-800">
        <p className="text-2xl font-bold text-white">Configure your blog</p>
        <div className="flex w-full flex-col justify-center items-start">
          <p className="text-xl self-start font-bold text-white">
            Select a repository
          </p>
          <RepoSelection
            selection={
              locked
                ? installation.attributes.repositories.data.filter(
                    (repo) => repo.id.toString() === repoID
                  )
                : possibleSelections
            }
            locked={locked}
            setRepoID={setRepoID}
          />
        </div>
        <p className="self-start text-md font-bold text-white">
          Configure the frequency your blog will generate posts and set it to
          private or public.
        </p>
        <div className="flex w-full  flex-row self-start items-center justify-between">
          <Cron setCron={setCron} />
          <Toggle
            className="self-end"
            privatePosts={privatePosts}
            setPrivate={(e) => {
              setPrivatePosts(e);
            }}
          />
        </div>
        <button
          onClick={async () => {
            await submit(id, repoID, cron, privatePosts, auth.jwt);

            await refresh();
            navigate(`/dashboard`);
          }}
          className="self-end text-white bg-green-700 hover:bg-green-500 border-slate-200 px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const RepoSelection = ({ selection, locked, setRepoID }) => {
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (selection.length > 0) {
      setSelected(selection[0].id);
    }
  }, [selection]);

  return (
    <div className="flex justify-center mb-4 w-full">
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
        onChange={(e) => {
          setSelected(e.target.value);
          setRepoID(e.target.value);
        }}
        value={selected}
      >
        {selection.map((repo) => {
          return (
            <option key={repo.id} value={repo.id}>
              {repo.attributes.full_name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const Toggle = ({ privatePosts, setPrivate }) => {
  return (
    <label class="relative inline-flex items-center me-5 cursor-pointer">
      <input
        onChange={() => {
          setPrivate(!privatePosts);
        }}
        type="checkbox"
        value=""
        class="sr-only peer"
        checked={privatePosts}
      />
      <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
      <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        Private
      </span>
    </label>
  );
};

const Cron = ({ setCron }) => {
  const [everyValue, setEveryValue] = useState("2");
  const [timeUnit, setTimeUnit] = useState("weeks");

  useEffect(() => {
    setCron(`${everyValue} ${timeUnit}`);
  }, [everyValue, timeUnit]);

  return (
    <div className="w-full flex flex-row gap-2 self-start justify-center items-center mb-4">
      <label for="every" className="block mb-2 text-sm font-medium text-white">
        every
      </label>
      <input
        type="text"
        value={everyValue}
        className="text-sm rounded-lg w-10 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => setEveryValue(e.target.value)}
      />
      <select
        className="text-sm rounded-lg  p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        value={timeUnit}
        onChange={(e) => setTimeUnit(e.target.value)}
      >
        <option value="weeks">Weeks</option>
        <option value="days">Days</option>
      </select>
    </div>
  );
};
const submit = async (id, repoID, cron, privatePosts, jwt) => {
  if (id) {
    PutRepoConfiguratiion(id, cron, privatePosts, jwt)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    PostRepoConfiguratiion(repoID, cron, privatePosts, jwt)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
export default ConfigurationGenerator;
