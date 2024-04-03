import React from "react";

const SubscribeForms = () => {
  return (
    <div className="border border-gray-700/80 rounded-full flex items-center pl-4">
      <input
        type="email"
        className="flex-grow py-1 outline-none"
        placeholder="Your email"
      />
      <button className="px-4 py-2 bg-black text-white rounded-full">
        Subscribe
      </button>
    </div>
  );
};

export default SubscribeForms;
