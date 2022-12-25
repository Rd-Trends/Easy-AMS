import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { IoThunderstormSharp } from "react-icons/io5";
import { BsSpeedometer } from "react-icons/bs";
import { FiDatabase } from "react-icons/fi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { MdOutlinePersonAddDisabled } from "react-icons/md";
import Hero from "../components/Hero";
import HomeLayout from "../layouts/HomeLayout";
import useURL from "../hooks/useURL";
import Seo from "../components/Seo";

export default function Home() {
  const url = useURL();
  return (
    <HomeLayout>
      <Seo url={url} />
      <Hero />
      <section
        className=" flex flex-col justify-center w-11/12 md:w-10/12 lg:w-9/12 mx-auto py-8 space-y-8 md:pb-20 lg:pb-0"
        id="about"
      >
        <h2 className="section__title mx-auto mb-4">What's Easy-AMS</h2>
        <div className="mt-4 md:mt-8">
          <img
            src="/attendance.svg"
            alt=""
            className="mb-4 w-full md:w-1/2 md:float-right"
          />
          <div className=" [&>p]:text-lg [&>p]:mb-4 w-full">
            <p>
              Attendance is a measure of commitment to work. It shows how many
              people care about what you do. And we know that people especially
              employees and students are most likely to show up when leaders
              take attendance at meetings or lecture.
            </p>
            <p>
              Taking records of attendance is a very crucial thing, it doesn’t
              only show the number of people present, it also goes a long way to
              show how much of growth and impact you are making.
            </p>
            <p>
              Easy-AMS is an attendance management system that makes the work of
              managing and signing attendance easier and faster for corporate
              bodies and individuals. It is an important tool for taking
              attendance when having lectures, meetings, coursework, either
              online or offline.
            </p>
            <p>
              With Easy-AMS one can create attendance virtually, sign attendance
              faster without the rush, and keep lasting records of all
              attendance. With our Unique ID verification technology, one is
              sure to avoid impersonation in attendance.
            </p>
            <p>
              Easy-AMS is just what it is—an EASY Attendance Management System!
            </p>
          </div>
        </div>
      </section>
      <section
        className="flex flex-col justify-center w-11/12 md:w-10/12 lg:w-9/12 mx-auto py-8 md:mt-20 lg:mt-0"
        id="features"
      >
        <h2 className="section__title lg:mt-8 md:mb-4">Why Use Easy-AMS</h2>
        <div className="mt-16 flex flex-col space-y-12 md:space-y-0 md:gap-12 md:flex-row">
          <div className=" bg-element-bg dark:bg-dark-body-bg py-8 px-4 w-full max-w-[300px] mx-auto md:mx-0 rounded-md shadow-xl relative">
            <span className=" absolute left-4 md:left-1/2 -top-[25px] md:-translate-x-1/2 bg-primary w-[50px] h-[50px] rounded-full flex items-center justify-center">
              <AiOutlineThunderbolt size={30} color="#ffffff" />
            </span>
            <h3 className=" text-lg font-bold mt-2 mb-2">
              Take Quick Attendance
            </h3>
            <p>
              Get everyone to sign your attendance in seconds no matter the
              crowd!
            </p>
          </div>
          <div className=" bg-element-bg dark:bg-dark-body-bg py-8 px-4 w-full max-w-[300px] mx-auto md:mx-0 rounded-md shadow-xl relative">
            <span className=" absolute left-4 md:left-1/2 -top-[25px] md:-translate-x-1/2 bg-primary w-[50px] h-[50px] rounded-full flex items-center justify-center">
              <MdOutlinePersonAddDisabled size={30} color="#ffffff" />
            </span>
            <h3 className=" text-lg font-bold mt-2 mb-2">
              Avoid Impersonation
            </h3>
            <p>
              Avoid someone else signing attendance for another with our unique
              ID verification technology!
            </p>
          </div>
          <div className=" bg-element-bg dark:bg-dark-body-bg py-8 px-4 w-full max-w-[300px] mx-auto md:mx-0 rounded-md shadow-xl relative">
            <span className=" absolute left-4 md:left-1/2 -top-[25px] md:-translate-x-1/2 bg-primary w-[50px] h-[50px] rounded-full flex items-center justify-center">
              <FiDatabase size={30} color="#ffffff" />
            </span>
            <h3 className=" text-lg font-bold mt-2 mb-2">
              Save Attendance Records
            </h3>
            <p>
              Keep all attendance records in one place, save it for as long as
              possible and access them whenever you want!
            </p>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
}
