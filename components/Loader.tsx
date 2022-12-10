import React from "react";
import dynamic from "next/dynamic";
import Logo from "./Logo";

const PageWrapper = dynamic(() => import("./PageWrapper"), {
  ssr: false,
});

const Loader = () => {
  return (
    <PageWrapper>
      <div className="bg-element-bg dark:bg-dark-element-bg w-screen h-screen flex flex-col items-center justify-center space-y-8">
        <Logo />
        <div className="loader"></div>
      </div>
    </PageWrapper>
  );
};

export default Loader;
