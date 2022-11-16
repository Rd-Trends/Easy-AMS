import React from "react";
import { QRCodeSVG } from "qrcode.react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useThemeContext } from "../../context/themeContext";

const SignAttendance = () => {
  const { theme } = useThemeContext();

  const data = {
    name: "Daniel Ikoyo",
  };
  return (
    <DashboardLayout>
      <div className="w-full md:w-7/12 mx-auto max-w-full h-[700px] mt-8 bg-element-bg dark:bg-dark-element-bg text-font-color shadow-lg rounded-lg dark:text-dark-font-color p-4">
        <h1 className=" text-3xl mt-8 mb-8 text-center">Sign Attendance</h1>
        <QRCodeSVG
          value={JSON.stringify(data)}
          bgColor="transparent"
          fgColor={theme === "dark" ? "#CCCCCC" : "#000000"}
          className=" w-full"
          size={200}
        />
      </div>
    </DashboardLayout>
  );
};

export default SignAttendance;
