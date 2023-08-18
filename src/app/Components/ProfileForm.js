"use client";
import React, { useState, useEffect } from "react";

import Upload from "@/app/Components/Upload";
import Image from "next/image";
import { HiUpload } from "react-icons/hi";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
const ProfileForm = ({ data }) => {
  const [form, setForm] = useState({
    name: data?.name,
    email: data?.email,
    bio: data?.bio,
    phone: data?.phone,
  });

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSubmit = async (e, email) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/users/${email}`, {
        method: "PATCH",
        body: JSON.stringify({ ...form, avatar: photo }),
      });

      console.log(await res.json());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-[1284px] mt-11 mx-auto space-y-11 px-8 py-11">
      <div className="w-full">
        <label htmlFor="photo">
          {!photo ? (
            <div className="w-full bg-gray-200 h-36 md:h-96 flex items-center justify-center">
              <div className="flex flex-col items-center">
                {!loading ? (
                  <>
                    <HiUpload size={30} />
                    <h3>Upload</h3>
                  </>
                ) : (
                  <>
                    <ClipLoader color="black" size={30} />
                    <h3>loading...</h3>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="relative max-w-36  h-36 md:h-96">
              <Image
                src={data.image || photo.imageName}
                alt="cover"
                fill
                className=" object-cover object-center "
                priority
              />

              <button className="absolute -top-5 -right-5 bg-red-500 w-[50px] h-[50px] text-lg font-bold text-white rounded-full">
                X
              </button>
            </div>
          )}
        </label>
        <Upload
          id={"photo"}
          setLoading={setLoading}
          setPhoto={setPhoto}
          photo={photo}
        />
      </div>
      <form onSubmit={(e) => handleSubmit(e, data.email)}>
        <div className="space-y-3 flex flex-col ">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="px-2 py-4 bg-gray-100/30 outline-none border border-gray-300"
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="space-y-3 flex flex-col ">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="px-2 py-4 bg-gray-100/30 outline-none border border-gray-300"
            id="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="space-y-3 flex flex-col ">
          <label htmlFor="email">Bio</label>
          <textarea
            type="bio"
            className="px-2 py-4 bg-gray-100/30 outline-none border border-gray-300"
            id="bio"
            value={form.bio}
            rows={10}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
          <div className="space-y-3 flex flex-col ">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="phone"
              className="px-2 py-4 bg-gray-100/30 outline-none border border-gray-300"
              id="phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
        </div>
        <button className="px-4 py-2 bg-black text-white active:scale-95 transition-transform duration-200 mt-[6rem]">
          {submitLoading ? <ClipLoader color="white" size={28} /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
