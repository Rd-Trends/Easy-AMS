import React, { useState } from "react";
import dynamic from "next/dynamic";
import { QRCodeSVG } from "qrcode.react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useThemeContext } from "../../context/themeContext";
import Button from "../../components/Button";
import useUser from "../../hooks/useUser";
import axios from "axios";
import { BiCheckCircle } from "react-icons/bi";
import useLocation from "../../hooks/useLocation";
import useURL from "../../hooks/useURL";
import Seo from "../../components/Seo";

const PrivatRoute = dynamic(() => import("../../components/PrivatRoute"), {
  ssr: false,
});

const SignAttendance = () => {
  const [recordId, setRecordId] = useState<string>("");
  const [message, setMessage] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { theme } = useThemeContext();
  const { user } = useUser();
  const { longitude, latitude } = useLocation();
  const url = useURL();

  const signAttendance = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    setLoading(true);
    const response = await axios.patch(
      `/api/record/recordId/${recordId}`,
      {
        participantId: user?._id,
        participantFullName: user?.fullName,
        participantLocation: { latitude, longitude },
      },
      {
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      }
    );

    if (response.status === 200) {
      setMessage({
        type: "success",
        message: "Attendance signed successfully",
      });
      setLoading(false);
    }

    if (response.status === 403 || response.status === 404) {
      setMessage({ type: "error", message: response.data.message });
      setLoading(false);
    }
  };

  return (
    <PrivatRoute>
      <Seo
        url={url}
        seo={{
          title: "Sign Attendance",
          metaDesc: "Sign attendance easily and quickly using Easy-AMS",
          metaKeywords: "Sign attendance using Easy-AMS, easy-AMS",
        }}
        noindex={true}
        nofollow={true}
      />
      <DashboardLayout>
        <div className="w-full md:w-7/12 mx-auto max-w-full h-full my-8 py-8 bg-element-bg dark:bg-dark-element-bg text-font-color shadow-lg rounded-lg dark:text-dark-font-color p-4">
          <h1 className=" text-3xl  text-center -mb-2 md:mb-8">
            Sign Attendance
          </h1>
          <QRCodeSVG
            value={JSON.stringify(user)}
            bgColor="transparent"
            fgColor={theme === "dark" ? "#071032" : "#071032"}
            className=" w-full md:w-9/12 mx-auto bg-white p-4 mt-8 h-full rounded-sm"
            size={400}
          />

          <div className="h-4 border-b border-gray-500 text-xl text-center my-5 md:w-9/12 mx-auto mb-8 w-full">
            <span className="px-3 bg-element-bg dark:bg-dark-element-bg">
              or
            </span>
          </div>

          <form onSubmit={signAttendance} className="md:w-9/12 mx-auto">
            <label className=" block mb-4">
              Record ID
              <input
                type="text"
                placeholder="ID of Record"
                className="block mt-1 border-2 dark:border-gray-700 w-full outline-none hover:border-primary dark:hover:border-primary py-2 px-4 rounded-md bg-transparent"
                value={recordId}
                onChange={(e) => setRecordId(e.target.value)}
                required
              />
            </label>
            <Button disabled={loading} loading={loading} width="full">
              Sign Attendance
            </Button>
            {message?.type === "success" && (
              <div className="flex flex-col items-center px-4 py-6">
                <BiCheckCircle size={60} className=" text-green-600" />
                <p className=" text-font-color dark:text-dark-font-color mt-4">
                  {message.message}
                </p>
              </div>
            )}
            {message?.type === "error" && (
              <p className=" text-red-500 mt-4">{message.message}</p>
            )}
          </form>
        </div>
      </DashboardLayout>
    </PrivatRoute>
  );
};

export default SignAttendance;
