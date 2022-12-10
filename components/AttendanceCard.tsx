import React from "react";
import Link from "next/link";
import { styles } from "../constants/style";
import { attendance } from "../interface";
import { BsPeopleFill, BsListOl } from "react-icons/bs";
import { FaListOl } from "react-icons/fa";
import { MdDescription } from "react-icons/md";

const AttendanceCard = ({
  title,
  description,
  numberOfRecords,
  numberOfParticipants,
  _id,
}: attendance) => {
  return (
    <Link
      href={`/dashboard/attendance/${_id}`}
      className={` ${styles.elementBg} ${styles.fontColor} p-4 rounded-lg shadow-2xl max-w-[100%] w-[320px] mx-auto md:mx-0`}
    >
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="flex items-start space-x-3 mb-2">
        <MdDescription size={25} className=" text-primary " />
        <p>{description}</p>
      </div>
      <div className="flex items-center space-x-3 mb-2">
        <FaListOl className=" text-primary " />
        <p>{numberOfRecords} records taken</p>
      </div>
      <div className="flex items-center space-x-3">
        <BsPeopleFill className=" text-primary" />{" "}
        <p>{numberOfParticipants} participants</p>
      </div>
    </Link>
  );
};

export default AttendanceCard;
