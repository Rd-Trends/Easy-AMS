import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import AttendanceCard from "../../components/AttendanceCard";
import { AiOutlinePlus } from "react-icons/ai";
import dynamic from "next/dynamic";
import { styles } from "../../constants/style";
import CreateAttendance from "../../components/CreateAttendance";
import { AnimatePresence } from "framer-motion";
import useSWR from "swr";
import axios from "axios";
import { attendance } from "../../interface";
import Button from "../../components/Button";
import useURL from "../../hooks/useURL";
import Seo from "../../components/Seo";

const PrivatRoute = dynamic(() => import("../../components/PrivatRoute"), {
  ssr: false,
});

const Dashboard = () => {
  const [showCreateAttendance, setShowCreateAttendance] =
    useState<Boolean>(false);
  const [attendances, setAttendances] = useState<attendance[]>([]);

  const url = useURL();

  const { data, error } = useSWR<attendance[]>("/api/attendance");

  useEffect(() => {
    if (data) {
      setAttendances(data);
    }
  }, [data]);

  const hideCreateAttendance = () => {
    setShowCreateAttendance(false);
  };

  const createNewAttendance = async (title: string, description: string) => {
    const response = await axios.post("/api/attendance", {
      title,
      description,
    });

    if (response.data) {
      console.log(response.data);

      setAttendances((prevAttendances) => [...prevAttendances, response.data]);
      setShowCreateAttendance(false);
    }
  };

  if (!data && !error) {
    return <></>;
  }

  return (
    <>
      {" "}
      <Seo
        url={url}
        seo={{
          title: "Easy-Ams - Dashboard",
          metaDesc: "Cretae attendance using Easy-Mas",
          metaKeywords: "",
        }}
      />
      <PrivatRoute>
        <DashboardLayout>
          <AnimatePresence initial={false} mode="wait">
            {showCreateAttendance && (
              <CreateAttendance
                hideCreateAttendance={hideCreateAttendance}
                createNewAttendance={createNewAttendance}
              />
            )}
          </AnimatePresence>
          {attendances.length ? (
            <div>
              <div className=" flex flex-col items-start md:flex-row md:items-center justify-between mt-12 mb-8 space-y-4  md:space-y-0 md:gap-4">
                <h1 className={` text-4xl ${styles.fontColor}`}>
                  Your Attendance
                </h1>

                <Button onClick={() => setShowCreateAttendance(true)} size="md">
                  <AiOutlinePlus size={20} />
                  <span className="ml-2"> New Attendance</span>
                </Button>
              </div>
              <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
                {attendances.length &&
                  attendances.map((attendance, index) => (
                    <AttendanceCard
                      key={attendance._id}
                      title={attendance.title}
                      description={attendance.description}
                      numberOfRecords={attendance.numberOfRecords}
                      numberOfParticipants={attendance.numberOfParticipants}
                      _id={attendance._id}
                    />
                  ))}
              </div>
            </div>
          ) : (
            <div className=" flex flex-col items-center mx-auto w-full justify-between mt-[6rem] mb-8 space-y-4 md:space-y-0 gap-4">
              <h1
                className={` text-4xl font-light text-center ${styles.fontColor}`}
              >
                You haven't created any attendance yet
              </h1>

              <button
                onClick={() => setShowCreateAttendance(true)}
                className=" flex items-center outline-none bg-primary text-white py-4 px-8 text-base rounded-lg"
              >
                <AiOutlinePlus size={20} />
                <span className="ml-2">Create New Attendance</span>
              </button>
            </div>
          )}
        </DashboardLayout>
      </PrivatRoute>
    </>
  );
};

export default Dashboard;
