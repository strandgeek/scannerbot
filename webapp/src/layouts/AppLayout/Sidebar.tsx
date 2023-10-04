import { Dialog, Transition } from "@headlessui/react";
import {
  BriefcaseIcon,
  DocumentMagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { FC, Fragment } from "react";
import LogoSrc from "../../assets/scannerbot-logo-dark.png";
import classNames from "classnames";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../client/queries/auth";
import { EllipsisVerticalIcon, UserIcon } from "@heroicons/react/20/solid";

export interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const navigation = [
  {
    name: "Scans",
    path: "/app/scans",
    icon: DocumentMagnifyingGlassIcon,
  },
  {
    name: "Projects",
    path: "/app/projects",
    icon: BriefcaseIcon,
  },
  // {
  //   name: "Settings",
  //   path: "/app/settings",
  //   icon: Cog6ToothIcon,
  // },
];

export const Sidebar: FC<SidebarProps> = ({ open, setOpen }) => {
  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
  });
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  const renderMenuContent = () => {
    return (
      <>
        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
          <div className="flex-shrink-0 flex items-center px-4">
            <img className="h-6 w-auto" src={LogoSrc} alt="Workflow" />
          </div>
          <nav className="mt-5 px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={classNames(
                  "group flex items-center px-2 py-2 text-base font-medium rounded-md",
                  item.path === pathname
                    ? "bg-primary-focus text-primary-content"
                    : "text-primary-content hover:bg-primary-focus/40 hover:text-primary-content"
                )}
              >
                <item.icon
                  className="mr-4 flex-shrink-0 h-6 w-6"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="bg-primary-focus p-4 text-white flex justify-between">
          <div className="flex items-center">
            <div className="rounded-full bg-gray-600 p-1 mr-2">
              <UserIcon className="w-4 h-4" />
            </div>
            {meData?.firstName}{" "}
          </div>
          <div className="dropdown dropdown-right dropdown-end">
            <label tabIndex={0} className="btn btn-sm btn-ghost btn-square">
              <EllipsisVerticalIcon className="w-4 h-4" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-primary rounded-box w-52"
            >
              <li className="hover:text-white">
                <a className="hover:text-white" onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 md:hidden"
          open={open}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity npm runease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-primary">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              {renderMenuContent()}
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" />
        </Dialog>
      </Transition.Root>

      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-primary">
            {renderMenuContent()}
          </div>
        </div>
      </div>
    </>
  );
};
