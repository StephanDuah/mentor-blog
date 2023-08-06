"use client";
import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

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
    }
  };
  return (
    <div className="w-full min-h-screen max-w-[1024px] mx-auto">
      <form className="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          className="p-4 outline-none border"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="email"
          className="p-4 outline-none border"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="number"
          className="p-4 outline-none border"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          className="p-4 outline-none border"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="px-6 py-3 bg-black text-white block">Submit</button>
      </form>
    </div>
  );
};

export default Register;
