"use client";
import React, { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { getRegex } from "@/utils/formatting";

const Searchbar = () => {
  const [search, setSearch] = useState();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push(`/search/?title=${search}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center justify-between p-2 border-2 border-gray-300"
    >
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search"
        className="flex-1 w-full p-2 text-lg placeholder:text-lg focus:outline-none outline-none"
      />
      <HiSearch color="grey" className="h-5 w-5" />
    </form>
  );
};

export default Searchbar;
