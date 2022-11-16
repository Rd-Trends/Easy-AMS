import React from 'react'
import { FaRegListAlt } from 'react-icons/fa';

const Logo = () => {
  return (
    <div className=" flex flex-row items-center">
      <FaRegListAlt size={40} className=" text-primary" />
      <span className=" ml-4 text-3xl font-semibold uppercase">Ams</span>
    </div>
  );
}

export default Logo