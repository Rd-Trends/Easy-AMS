import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Logo from "../../components/Logo";
import { FaBars } from "react-icons/fa";

const PageWrapper = dynamic(() => import("../../components/PageWrapper"), {
  ssr: false,
});

interface props {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: props) => {
  return (
    <PageWrapper>
      <div className="w-full h-full min-h-screen bg-element-bg dark:bg-dark-element-bg">
        <nav className=" flex items-center justify-between w-11/12 md:w-10/12 lg:w-9/12 mx-auto py-8">
          <Logo />
          <ul className=" hidden md:flex items-center gap-4 text-font-color dark:text-dark-font-color">
            <li>
              <Link
                href="/#about"
                className="py-2 px-2 border-b-4 border-transparent hover:border-b-primary"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/#Features"
                className="py-2 px-2 border-b-4 border-transparent hover:border-b-primary"
              >
                Faatures
              </Link>
            </li>
            <li>
              <Link
                href="/auth/login"
                className="py-2 px-6 border-2 border-primary bg-transparent rounded-md hover:opacity-60"
              >
                Sign in
              </Link>
            </li>
            <li>
              <Link
                href="/auth/signup"
                className="py-2 px-6 bg-primary text-white rounded-md hover:opacity-70"
              >
                Sign up
              </Link>
            </li>
          </ul>
          <button className="md:hidden outline-none bg-transparent border-none text-font-color dark:text-dark-font-color">
            <FaBars size={25} />
          </button>
        </nav>
        <main>{children}</main>
      </div>
    </PageWrapper>
  );
};

export default HomeLayout;
