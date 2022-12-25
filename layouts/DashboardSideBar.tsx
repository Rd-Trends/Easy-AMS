import React, { memo } from "react";
import Link from "next/link";
import Router from "next/router";
import { useRef, useEffect } from "react";
import { FaRegAddressBook } from "react-icons/fa";
import Logo from "../components/Logo";
import { FiEdit, FiHelpCircle } from "react-icons/fi";
import { BiLogOutCircle } from "react-icons/bi";
import { SidebarProps } from "./DashboardLayout";
import useUser from "../hooks/useUser";

const DashboardSideBar = ({
  isSideBarOpen,
  toggleSideBar,
}: SidebarProps): JSX.Element => {
  const sideBarRef = useRef<HTMLElement | null>(null);

  const { mutate } = useUser();

  useEffect(() => {
    if (isSideBarOpen) {
      sideBarRef?.current?.focus();
    }
  }, [isSideBarOpen]);

  const onBlured = (event: React.FocusEvent<HTMLElement>): void => {
    if (!event.currentTarget.contains(event.relatedTarget) && isSideBarOpen) {
      console.log("yes");
      toggleSideBar();
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 204) {
        mutate(undefined);
        Router.push("/auth/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className={`h-screen w-screen fixed top-0 left-0 bg-black  opacity-50 ${
          isSideBarOpen ? "block" : "hidden"
        } lg:hidden z-50`}
      ></div>
      <nav
        className={` bg-element-bg dark:bg-dark-element-bg text-font-color dark:text-dark-font-color py-8 px-8 fixed lg:sticky top-0 left-0 ${
          isSideBarOpen ? "translate-x-[0%]" : "translate-x-[-100%]"
        } lg:translate-x-[0%] transition-transform duration-300 text w-[80%] min-w-[300px] max-w-[100%] md:max-w-sm lg:w-3/12 flex flex-col justify-between h-screen z-50`}
        ref={sideBarRef}
        onBlur={onBlured}
        tabIndex={0}
      >
        <div className="mt-2">
          <Logo />

          <div className="mt-10">
            <span className=" text-lg text-gray-400 mb-4 block font-medium">
              Tools
            </span>
            <div>
              <Link href="/dashboard" className="flex items-center mb-4">
                <FaRegAddressBook size={25} />
                <span className="ml-8">Attendance</span>
              </Link>
              <Link
                href="/dashboard/sign-attendance"
                className="flex items-center"
              >
                <FiEdit size={25} />
                <span className="ml-8 capitalize">Sign Attendance</span>
              </Link>
            </div>
          </div>

          <div className="mt-10">
            <span className=" text-lg text-gray-400 mb-4 block font-medium">
              Others
            </span>
            <div>
              <Link href="/dashboard/help" className="flex items-center mb-4">
                <FiHelpCircle size={25} />
                <span className="ml-8">Help</span>
              </Link>
              <Link href="/dashboard/#" className="flex items-center">
                <FiEdit size={25} />
                <span className="ml-8">FAQ</span>
              </Link>
            </div>
          </div>
        </div>

        <footer className="">
          <button onClick={logout} className="flex items-center md:hidden">
            <BiLogOutCircle size={25} />
            <span className="ml-8">Sign out</span>
          </button>

          <div className="pt-8 text-xs">
            <p className="ml-6"> &copy; {new Date().getFullYear()} Easy-AMS</p>
            <p>
              Made with <span className="text-red-500">&#10084;</span> by Daniel
              Ikoyo
            </p>
          </div>
        </footer>
      </nav>
    </>
  );
};

export default memo(DashboardSideBar);
