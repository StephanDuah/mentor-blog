"use client";
import React from "react";
import { motion } from "framer-motion";
const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute top-0 min-h-screen w-full left-0 bg-black/80 backdrop-blur-sm z-10 flex items-center justify-center  bottom-0"
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
