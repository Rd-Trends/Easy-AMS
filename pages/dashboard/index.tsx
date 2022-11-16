import React, { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayout from "../../layouts/DashboardLayout";
import AttendanceCard from "../../components/AttendanceCard";
import { AiOutlinePlus } from "react-icons/ai";
import dynamic from "next/dynamic";
import { styles } from "../../constants/style";
import useUser from "../../hooks/useUser";
import CreateAttendance from "../../components/CreateAttendance";
import { AnimatePresence } from "framer-motion";

const PrivatRoute = dynamic(() => import("../../components/PrivatRoute"), {
  ssr: false,
});

const index = () => {
  const [showCreateAttendance, setShowCreateAttendance] =
    useState<Boolean>(false);

  const hideCreateAttendance = () => {
    setShowCreateAttendance(false);
  };
  return (
    <PrivatRoute>
      <DashboardLayout>
        <AnimatePresence initial={false} exitBeforeEnter={true}>
          {showCreateAttendance && (
            <CreateAttendance hideCreateAttendance={hideCreateAttendance} />
          )}
        </AnimatePresence>
        <div className=" flex items-center justify-between">
          <h1 className={` text-4xl mt-12 mb-8 ${styles.fontColor}`}>
            Your Attendance
          </h1>

          <button
            onClick={() => setShowCreateAttendance(true)}
            className=" flex items-center outline-none bg-primary text-white py-4 px-8 text-base rounded-lg"
          >
            <AiOutlinePlus size={20} />
            <span className="ml-2"> New Attendance</span>
          </button>
        </div>
        <div className=" grid grid-cols-3 gap-8">
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
        </div>
      </DashboardLayout>
    </PrivatRoute>
  );
};

export default index;
