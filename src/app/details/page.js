"use client";
import React, { useState } from "react";
import Image from "next/image";
import pic from "../../../public/images/21.jpg";
import { HiClock } from "react-icons/hi";
import Upload from "../Components/Upload";
import { MDXRemote } from "next-mdx-remote";
const Details = () => {
  const [photo, setPhoto] = useState({});
  return (
    <article className="mx-auto p-8 max-w-[1248px]">
      <section className="relative w-full">
        <Image
          src={pic}
          alt="details"
          className="w-full max-h-72 object-cover "
        />
        <div className="absolute top-0 left-0 w-full h-full bg-white/5  backdrop-blur-sm text-white p-8">
          <div className="flex flex-col gap-4 md:flex-row justify-between">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold capitalize  ">
                Welcome To my Page
              </h1>
              <p className="flex gap-1 items-center">
                <HiClock /> <span>December 2023</span>
              </p>
            </div>
            <div className="">
              <h1 className="text-xl font-semibold capitalize  ">Kwaku Duah</h1>
              <div>dfskdfsalkldksflakldskl</div>
            </div>
          </div>
        </div>
      </section>
      <Upload photo={photo} setPhoto={setPhoto} />
    </article>
  );
};

export default Details;
