import React from "react";
import { HiSearch } from "react-icons/hi";
const Searchbar = () => {
  return (
    <form className="w-full flex items-center justify-between p-2 border-2 border-gray-300">
      <input
        type="text"
        placeholder="search"
        className="flex-1 w-full p-2 text-lg placeholder:text-lg focus:outline-none outline-none"
      />
      <HiSearch color="grey" className="h-5 w-5" />
    </form>
  );
};

export default Searchbar;
