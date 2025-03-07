import { Fragment, useContext, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "./Auth/AuthContext";
import AuthModal from "./Auth/AuthModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Logo from "../Assets/image.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState("Dashboard");
  const { auth, logOut } = useContext(AuthContext);
  const navigation = [
    { name: "Dashboard", href: "/dashboard", current: active === "Dashboard" },
    {
      name: "Configurations",
      href: "/list-repository-configurations",
      current: active === "Configurations",
    },
  ];
  const navigate = useNavigate();

  return (
    <Disclosure
      as="nav"
      className="bg-slate-900 w-full flex items-center justify-center m-0"
    >
      {({ open }) => (
        <>
          <div className="flex w-full items-center justify-center max-w-7xl p-2 sm:p-6 lg:p-8 self-center">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white-400 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img className="h-8 w-auto" src={Logo} alt="Your Company" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        setActive(item.name);
                        navigate(item.href);
                      }}
                      className={classNames(
                        item.current
                          ? "bg-slate-900 text-white cursor-pointer"
                          : "text-white-300 hover:bg-slate-700 hover:text-white cursor-pointer",
                        "rounded-md px-3 py-2 text-sm font-medium text-decoration-line: none"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {auth ? (
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8  w-8 rounded-full"
                        src={`https://github.com/${auth.user.username}.png`}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-slate py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active ? "bg-slate-100" : "",
                              "px-4 py-2 text-sm text-white bg-slate-900 hover:bg-slate-700 rounded cursor-pointer w-full text-left"
                            )}
                            onClick={() => {
                              logOut();
                              navigate("/");
                            }}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <button
                  onClick={() => {
                    setShow(true);
                  }}
                  className="flex font-bold text-md items-center justify-between gap-3 border-1 text-white bg-green-800 rounded  py-1 px-3 border-2 border-green-700 hover:bg-green-600 hover:border-green-600 "
                >
                  <FontAwesomeIcon icon={faGithub} />
                  Sign In
                </button>
              )}
            </div>
            <AuthModal show={show} setShow={setShow} />
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-slate-900 text-white"
                      : "text-white hover:bg-slate-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
