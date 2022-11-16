import React from "react";
import { styles } from "../constants/style";

const AttendanceCard = () => {
  return (
    <div
      className={` ${styles.elementBg} ${styles.fontColor} p-4 rounded-lg shadow-2xl shadow-[rgba(100,100,111,0.2)] max-w-xs `}
    >
      <h3 className=" font-bold mb-4">MEE 301</h3>
      <p className=" mb-2">0 attendace taken</p>
      <p>56 participants</p>
    </div>
  );
};

export default AttendanceCard;
