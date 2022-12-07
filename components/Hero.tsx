import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-11/12 mx-auto flex flex-col md:items-center justify-center h-96 min-h-[calc(100vh-10rem)] lg:min-h-[calc(100vh-5rem)]">
      <h1 className="font-bold max-[320px]:text-3xl text-4xl md:text-6xl lg:text-7xl md:w-10/12 lg:w-9/12 md:text-center leading-[3rem] lg:leading-[5rem]">
        Create, Take, Manage and Sign Attendance easily!
      </h1>
      <p className="mt-4 font-semibold text-lg md:text-xl md:w-8/12 md:text-center lg:w-5/12">
        Avoid those distracting queues and take accurate attendance of everyone
        present in seconds!
      </p>
      <div className="flex gap-4 items-center mt-8">
        <Link
          href="/auth/login"
          className="py-2 w-[150px] max-w-full text-center border-2 border-primary bg-primary rounded-md text-white hover:opacity-70 font-bold text-lg"
        >
          Sign up
        </Link>
        <Link
          href="/auth/login"
          className="py-2 w-[150px] text-center bg-transparent border-2 border-primary text-primary rounded-md hover:opacity-70 font-bold text-lg"
        >
          Sign in
        </Link>
      </div>
    </section>
  );
};

export default Hero;
