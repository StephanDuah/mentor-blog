"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

const RegisterForm = ({ setVisible }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "/api/users/register",
        {
          method: "POST",
          body: JSON.stringify(form),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await res.json();
      console.log(response);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };
  return (
    <div className="p-8 max-w-[600px] mx-auto">
      <h1 className="text-3xl font-bold  text-gray-800 text-center mb-5 capitalize">
        Sign Up
      </h1>
      {error && (
        <h2 className="text-sm text-center text-red-500">
          Something went wrong
        </h2>
      )}
      <form
        className="flex flex-col  space-y-6 md:px-8 "
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <label htmlFor="name">Name</label>

          <input
            type="type"
            id="name"
            placeholder="Enter Name"
            className={`${
              error ? "border-red-500" : "border-gray-400"
            } w-full p-4 bg-transparent outline-none border-2  rounded-lg`}
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="w-full">
          <label htmlFor="email">Email</label>

          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            className={`${
              error ? "border-red-500" : "border-gray-400"
            } w-full p-4 bg-transparent outline-none border-2  rounded-lg`}
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
            className={`${
              error ? "border-red-500" : "border-gray-400"
            } w-full p-4 bg-transparent outline-none border-2  rounded-lg`}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <div className="w-full">
          <label htmlFor="c_password">Confirm Password</label>
          <input
            id="c_password"
            type="password"
            name="c_password"
            placeholder=" Enter Password"
            className={`${
              error ? "border-red-500" : "border-gray-400"
            } w-full p-4 bg-transparent outline-none border-2  rounded-lg`}
            value={form.confirm_password}
            onChange={(e) =>
              setForm({ ...form, confirm_password: e.target.value })
            }
          />
        </div>

        <button className="w-full py-3 bg-black text-white block rounded-lg  transition-transform duration-200 ease-out">
          {loading ? <ClipLoader size={25} color="white" /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
