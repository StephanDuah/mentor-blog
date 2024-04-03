"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import Page from "./Modal/Page";
import LoginForm from "./LoginForm";
import { useSession } from "next-auth/react";
import RegisterForm from "./RegisterForm";
import Image from "next/image";
import Logout from "./Logout";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const handleClose = () => {
    setVisible(false);
    setRegisterVisible(false);
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
          Pbencherey blog
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
            className="relative w-10 h-10 bg-black rounded-full text-white text-center py-2 font-bold uppercase"
          >
            {session.picture ? (
              <Image
                src={session?.picture.imageName}
                alt="profileImage"
                fill
                className="object-fill rounded-full"
              />
            ) : (
              session.name[0]
            )}
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
              href="/user/profile"
              className=" text-center hover:bg-slate-200 transition-colors duration-150  px-4 py-2 active:scale-95"
            >
              Profile
            </Link>

            <Logout />
          </div>
        </div>
      )}

      {/* larger */}
      {status === "unauthenticated" ? (
        <div className="flex justify-around space-x-4 items-center">
          <button onClick={() => setVisible(true)}>Log in</button>
          <button
            onClick={() => setRegisterVisible(true)}
            className="bg-black text-white rounded-full px-4 py-2 active:scale-95"
          >
            Sign up
          </button>
        </div>
      ) : (
        <div className="hidden sm:flex justify-around space-x-4 items-center">
          <Link
            href="/user/posts/create"
            className="bg-black text-white rounded-full px-4 py-2 active:scale-95"
          >
            Create Post
          </Link>

          <Logout />
          <Link
            href="/user/profile"
            className=" relative w-10 h-10 bg-black rounded-full text-white text-center py-2 font-bold uppercase"
          >
            {session?.picture ? (
              <Image
                src={session.picture.imageName}
                alt="profileImage"
                fill
                className="object-fill rounded-full"
              />
            ) : (
              session?.name[0]
            )}
          </Link>
        </div>
      )}

      <Page handleClose={handleClose} visible={registerVisible}>
        <RegisterForm setVisible={setRegisterVisible} />
      </Page>

      <Page handleClose={handleClose} visible={visible}>
        <LoginForm setVisible={setVisible} />
      </Page>
    </div>
  );
};

export default Navbar;
