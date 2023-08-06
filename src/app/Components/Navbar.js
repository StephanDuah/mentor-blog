"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import Page from "./Modal/Page";
import LoginForm from "./LoginForm";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const handleClose = () => {
    setVisible(false);
  };
  const [open, setOpen] = useState(false);

  const { status, data: session } = useSession();

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="p-8 flex justify-between items-center font-semibold max-w-[1248px] mx-auto">
      <div className="flex justify-around space-x-9 item-center text-black">
        {/* Icon container */}
        <Link href={"/"} className="text-lg">
          Untitled UI
        </Link>
        {/* Links */}
        <ul className="hidden sm:flex  justify-around space-x-4">
          <li>Home</li>
          <li>Products</li>
          <li>Resources</li>
        </ul>
      </div>
      {/* mobile */}
      {status === "authenticated" && (
        <div className="flex flex-col sm:hidden justify-around space-x-4 items-center transition-all ease-out duration-200">
          <button
            onClick={handleToggle}
            className="w-10 h-10 bg-blue-600 rounded-full text-white text-center py-2 font-bold uppercase"
          >
            p
          </button>
          <div
            className={`${
              open ? "flex flex-col" : "hidden"
            } absolute top-20 right-5  z-10 bg-white  shadow-lg py-3 `}
          >
            <Link
              href="/user/posts/create"
              className=" text-center hover:bg-slate-200 transition-colors duration-150  px-4 py-2 active:scale-95"
            >
              Create Post
            </Link>
            <Link
              href="/user/posts/create"
              className=" text-center hover:bg-slate-200 transition-colors duration-150  px-4 py-2 active:scale-95"
            >
              Profile
            </Link>

            <button className="  px-4 py-2 hover:bg-slate-200 transition-colors duration-150 active:scale-95">
              Log out
            </button>
          </div>
        </div>
      )}

      {/* larger */}
      {status === "unauthenticated" ? (
        <div className="flex justify-around space-x-4 items-center">
          <button onClick={() => setVisible(true)}>Log in</button>
          <Link
            href="/user/register"
            className="bg-black text-white rounded-full px-4 py-2 active:scale-95"
          >
            Sign up
          </Link>
        </div>
      ) : (
        <div className="hidden sm:flex justify-around space-x-4 items-center">
          <Link
            href="/user/posts/create"
            className="bg-black text-white rounded-full px-4 py-2 active:scale-95"
          >
            Create Post
          </Link>

          <button onClick={signOut}>Log out</button>
          <Link
            href="/profile"
            className="w-10 h-10 bg-blue-600 rounded-full text-white text-center py-2 font-bold uppercase"
          >
            p
          </Link>
        </div>
      )}

      <Page handleClose={handleClose} visible={visible}>
        <LoginForm setVisible={setVisible} />
      </Page>
    </div>
  );
};

export default Navbar;
