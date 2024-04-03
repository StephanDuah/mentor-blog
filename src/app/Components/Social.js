import Link from "next/link";
import React from "react";
import { FiTwitter, FiInstagram, FiYoutube, FiFacebook } from "react-icons/fi";
const Social = () => {
  return (
    <div className="flex justify-between w-[50%] h-[40px] my-11">
      <Link
        href="#"
        className="bg-black rounded-full w-[40px] h-[40px] flex justify-center items-center hover:bg-[#3b5998] transition ease-in"
      >
        <FiFacebook size={20} color="white" />
      </Link>
      <Link
        href="#"
        className="bg-black rounded-full w-[40px] h-[40px] flex justify-center items-center hover:bg-[#c32aa3] transition ease-in"
      >
        <FiInstagram size={20} color="white" />
      </Link>
      <Link
        href="#"
        className="bg-black rounded-full w-[40px] h-[40px] flex justify-center items-center hover:bg-[#ff0000] transition ease-in"
      >
        <FiYoutube size={20} color="white" />
      </Link>
      <Link
        href="#"
        className="bg-black rounded-full w-[40px] h-[40px] flex justify-center items-center hover:bg-[#1da1f2] transition ease-in"
      >
        <FiTwitter size={20} color="white" />
      </Link>
    </div>
  );
};

export default Social;
