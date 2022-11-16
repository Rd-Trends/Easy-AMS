import React from "react";
import Image from "next/image";
import { BsMoon, BsSun } from "react-icons/bs";

import { FaBars } from "react-icons/fa";
import { useThemeContext } from "../context/themeContext";
import { SidebarProps } from "./DashboardLayout";
import Router from "next/router";
import useUser from "../hooks/useUser";

const DashboardNavBar = ({ isSideBarOpen, toggleSideBar }: SidebarProps) => {
  const { theme, switchTheme } = useThemeContext();
  const { mutate, user } = useUser();

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
    <nav
      className={` flex flex-row justify-between w-full items-center my-4 p-4 rounded-md shadow-2xl shadow-[rgba(100,100,111,0.09)] bg-element-bg dark:bg-dark-element-bg text-font-color dark:text-dark-font-color `}
    >
      <div className="flex items-center gap-4">
        <Image
          src="/test.jpg"
          alt=""
          width={40}
          height={40}
          className=" h-10 w-10 rounded-full"
        />
        <p className=" capitalize text-base font-bold">{user?.fullName}</p>
      </div>
      <div className="flex items-center gap-4 relative">
        <button
          onClick={switchTheme}
          className="flex items-center outline-none bg-transparent font-light "
        >
          {theme === "light" ? <BsMoon size={20} /> : <BsSun size={20} />}
        </button>
        <button
          onClick={logout}
          className="hidden md:inline-block outline-none bg-transparent "
        >
          Sign Out
        </button>
        <button
          className=" outline-none bg-transparent z-10 lg:hidden"
          onClick={toggleSideBar}
        >
          <FaBars size={25} />
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavBar;
