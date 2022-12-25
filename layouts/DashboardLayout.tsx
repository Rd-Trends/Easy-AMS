import React from "react";
import DashboardSideBar from "./DashboardSideBar";
import { useState } from "react";
import DashboardNavBar from "./DashboardNavBar";
import dynamic from "next/dynamic";
import Meta from "./Meta";

const PageWrapper = dynamic(() => import("../components/PageWrapper"), {
  ssr: false,
});

export interface SidebarProps {
  isSideBarOpen: Boolean;
  toggleSideBar: () => void;
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSideBarOpen, setIsSidebarOpen] = useState<Boolean>(false);

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSideBarOpen);
  };

  return (
    <PageWrapper>
      <Meta />
      <div
        className={`bg-body-bg dark:bg-dark-body-bg w-full h-full min-h-screen flex flex-row`}
      >
        <DashboardSideBar
          isSideBarOpen={isSideBarOpen}
          toggleSideBar={toggleSideBar}
        />
        <div className="h-full w-screen lg:w-[70%] xl:w-9/12 px-4">
          <DashboardNavBar
            isSideBarOpen={isSideBarOpen}
            toggleSideBar={toggleSideBar}
          />

          {children}
        </div>
      </div>
    </PageWrapper>
  );
};

export default DashboardLayout;
