import React from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import classNames from "classnames";

interface modalProp {
  children: React.ReactNode;
  size?: string;
  closeModal?: () => void;
}

const Modal = ({ children, size = "sm", closeModal }: modalProp) => {

  const dropIn = {
    hidden: {
      y: "-20vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "20vh",
      opacity: 0,
    },
  };

  const modalClassNames = classNames(
    " bg-element-bg shadow-lg dark:bg-dark-element-bg z-50 rounded-md relative max-w-[90%] m-auto",
    {
      "w-[350px]": size === "sm",
      "w-[500px]": size === "md",
      "w-[700px]": size === "lg",
    }
  );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=" bg-[rgba(0,0,0,0.4)] dark:bg-[rgba(255,255,255,0.2)] w-screen h-screen fixed top-0 left-0 z-50 flex items-center justify-center"
    >
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={modalClassNames}
      >
        <button
          onClick={closeModal}
          className="bg-body-bg shadow-md dark:bg-dark-body-bg p-2 rounded-sm absolute -top-4 -right-4"
        >
          <IoClose className=" dark:text-white" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
