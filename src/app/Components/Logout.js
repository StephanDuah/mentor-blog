"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
const Logout = () => {
  const router = useRouter();
  const logout = () => {
    signOut();
    router.push("/");
  };
  return (
    <button
      onClick={logout}
      className="  px-4 py-2 hover:bg-slate-200 transition-colors duration-150 active:scale-95"
    >
      Log out
    </button>
  );
};

export default Logout;
