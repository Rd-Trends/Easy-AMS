import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Logo from "../../components/Logo";
import { BsMoon, BsSun } from "react-icons/bs";
import { useThemeContext } from "../../context/themeContext";

const PageWrapper = dynamic(() => import("../../components/PageWrapper"), {
  ssr: false,
});

interface props {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: props) => {
  const { theme, switchTheme } = useThemeContext();

  return (
    <PageWrapper>
      <div className="w-full h-full min-h-screen bg-body-bg dark:bg-dark-element-bg text-font-color dark:text-dark-font-color">
        <nav className=" flex items-center justify-between w-11/12 md:w-10/12 lg:w-9/12 mx-auto py-4 md:py-8">
          <Logo />
          <div className=" flex items-center gap-16">
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
                  href="/#features"
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
            <button
              onClick={switchTheme}
              className="flex items-center outline-none bg-transparent font-light "
            >
              {theme === "light" ? <BsMoon size={20} /> : <BsSun size={20} />}
            </button>
          </div>
          {/* <button className="md:hidden outline-none bg-transparent border-none text-font-color dark:text-dark-font-color">
            <FaBars size={25} />
          </button> */}
        </nav>
        <main>{children}</main>
        <footer className=" text-center py-8 pt-12 px-4">
          <p> &copy; {new Date().getFullYear()} Easy-AMS</p>
          <p>
            Made with <span className="text-red-500">&#10084;</span> by Daniel
            Ikoyo
          </p>
        </footer>
      </div>
    </PageWrapper>
  );
};

export default HomeLayout;
