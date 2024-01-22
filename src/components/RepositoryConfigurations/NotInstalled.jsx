import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import exampleImage from "../../Assets/example_add_repo.png";
export default function NotInstalled({ githubID, setShow, show }) {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShow}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-slate dark:bg-slate-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-white"
                      >
                        App Not Installed
                      </Dialog.Title>
                      <div className="flex flex-col items-center mt-2">
                        <img
                          src={exampleImage}
                          alt="example of how to configure and add a repository"
                          className="img-fluid rounded-2xl"
                          style={{ maxHeight: "450px" }}
                        />
                        <p className="text-sm text-white">
                          Install the Github App to continue
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900  px-4 py-4 flex flex-row justify-between gap-2">
                  <FontAwesomeIcon
                    className="text-white w-8 h-8 hidden sm:inline-block"
                    icon={faGithub}
                  />
                  <a
                    href={`https://github.com/apps/git-history-blog/installations/new/permissions?target_id=${githubID}`}
                    className="content-between no-underline w-full rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-500  sm:w-auto"
                  >
                    {"Install App"}
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
