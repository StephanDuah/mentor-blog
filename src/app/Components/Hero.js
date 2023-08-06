import React from "react";

const Hero = () => {
  return (
    <div className="max-w-[1248px] h-72 mx-auto flex flex-col p-8 py-11 md:justify-between md:flex-row">
      <div className=" space-y-11 flex-grow">
        <h1 className="text-6xl font-bold">Untitled Blog</h1>
        <div className="border border-gray-700 rounded-full flex items-center pl-4">
          <input
            type="email"
            className="flex-grow py-1 outline-none"
            placeholder="your email"
          />
          <button className="px-4 py-2 bg-black text-white rounded-full">
            Subscribe
          </button>
        </div>
      </div>
      <div className="text-center mt-[2rem] sm:mt-0">
        <p className="w-full md:w-[60%] font-semibold text-gray-800 text-lg mx-auto">
          New product features, the latest in technology,solutions and updates
        </p>
      </div>
    </div>
  );
};

export default Hero;
