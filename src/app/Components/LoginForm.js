"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

const LoginForm = ({ setVisible }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      setLoading(false);
      if (res.error) {
        console.log(res);
        return toast.error(res.error);
      }
      setVisible(false);
    } catch (e) {
      setLoading(false);

      console.log(e);
    }
  };
  return (
    <div className="p-8 max-w-[600px] mx-auto">
      <h1 className="text-3xl font-bold  text-gray-800 text-center mb-5 capitalize">
        Log In
      </h1>

      <form
        className="flex flex-col  space-y-6 md:px-8 "
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            className="w-full p-4 bg-transparent outline-none border-2 border-gray-400 rounded-lg"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="w-full">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder=" Enter Password"
            className="w-full p-4 bg-transparent outline-none border-2 border-gray-400 rounded-lg"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <div className="flex items-center space-x-3 flex-end">
          <input type="checkbox" />
          <label className="text-sm font-semibold text-gray-600 ">
            Remember me
          </label>
        </div>

        <button className="w-full py-3 bg-black text-white block rounded-lg  transition-transform duration-200 ease-out">
          {loading ? <ClipLoader size={25} color="white" /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
