"use client";
import React from "react";
import Backdrop from "./Backdrop";
import { motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import LoginForm from "../LoginForm";

const Page = ({ handleClose, children, visible }) => {
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };
  return (
    <>
      {visible && (
        <Backdrop onClick={handleClose}>
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className=" relative w-[clamp(400px,600px,80%)] bg-white  z-50 rounded-lg shadow-lg"
          >
            {children}
            <button onClick={handleClose}>
              <HiX className="absolute top-5 right-5 " size={28} />
            </button>
          </motion.div>
        </Backdrop>
      )}
    </>
  );
};

export default Page;
