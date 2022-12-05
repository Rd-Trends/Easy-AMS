import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-11/12 mx-auto flex flex-col md:items-center justify-center h-96 min-h-full">
      <h1 className="text-font-color dark:text-dark-font-color text-5xl md:text-6xl lg:text-7xl md:w-8/12 md:text-center leading-[3.5rem] lg:leading-[5rem]">
        Create, Take, Manage and Sign Attendance easily!
      </h1>
      <div className="flex gap-4 items-center mt-12">
        <Link
          href="/auth/login"
          className="py-2 w-[150px] text-center border-2 border-primary bg-primary rounded-md text-white hover:opacity-70 font-bold text-lg"
        >
          Sign up
        </Link>
        <Link
          href="/auth/login"
          className="py-2 w-[150px] text-center bg-transparent border-2 border-primary rounded-md text-white hover:opacity-70 font-bold text-lg"
        >
          Sign in
        </Link>
      </div>
    </section>
  );
};

export default Hero;
