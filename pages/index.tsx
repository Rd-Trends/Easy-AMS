import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { IoThunderstormSharp } from "react-icons/io5";
import { BsSpeedometer } from "react-icons/bs";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import HomeLayout from "../layouts/HomeLayout";
// import

export default function Home() {
  useEffect(() => {
    console.log("hello bro".replace(" ", ""));
  }, []);

  return (
    <HomeLayout>
      <Hero />
      <section className="flex flex-col justify-center w-11/12 md:w-10/12 lg:w-9/12 mx-auto py-8 gap-8">
        <h2 className="section__title lg:mt-8">Why Use Easy-AMS</h2>
        <div className="mt-12 flex flex-col gap-12 md:flex-row ">
          <div className=" bg-element-bg dark:bg-dark-body-bg py-8 px-4 w-full max-w-[300px] mx-auto md:mx-0 rounded-md shadow-xl relative">
            <span className=" absolute left-4 md:left-1/2 -top-[25px] md:-translate-x-1/2 bg-primary w-[50px] h-[50px] rounded-full flex items-center justify-center">
              <BsSpeedometer size={30} color="#ffffff" />
            </span>
            <h3 className=" text-lg font-bold mt-2 mb-4">
              Quickly take attendance
            </h3>
            <p>
              Take attendance as quick as possible, have a hundred people to
              take attendance for? do it all in just a single click!
            </p>
          </div>
          <div className=" bg-element-bg dark:bg-dark-body-bg py-8 px-4 w-full max-w-[300px] mx-auto md:mx-0 rounded-md shadow-xl relative">
            <span className=" absolute left-4 md:left-1/2 -top-[25px] md:-translate-x-1/2 bg-primary w-[50px] h-[50px] rounded-full flex items-center justify-center">
              <BsSpeedometer size={30} color="#ffffff" />
            </span>
            <h3 className=" text-lg font-bold mt-2 mb-4">
              Quickly take attendance
            </h3>
            <p>
              Take attendance as quick as possible, have a hundred people to
              take attendance for? do it all in just a single click!
            </p>
          </div>
          <div className=" bg-element-bg dark:bg-dark-body-bg py-8 px-4 w-full max-w-[300px] mx-auto md:mx-0 rounded-md shadow-xl relative">
            <span className=" absolute left-4 md:left-1/2 -top-[25px] md:-translate-x-1/2 bg-primary w-[50px] h-[50px] rounded-full flex items-center justify-center">
              <BsSpeedometer size={30} color="#ffffff" />
            </span>
            <h3 className=" text-lg font-bold mt-2 mb-4">
              Quickly take attendance
            </h3>
            <p>
              Take attendance as quick as possible, have a hundred people to
              take attendance for? do it all in just a single click!
            </p>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
}
