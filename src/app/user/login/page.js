"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      const response = res;
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="w-full min-h-screen max-w-[1024px] mx-auto">
      <form className="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          className="p-4 outline-none border"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          className="p-4 outline-none border"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="px-6 py-3 bg-black text-white block">Login</button>
      </form>
    </div>
  );
};

export default Login;
