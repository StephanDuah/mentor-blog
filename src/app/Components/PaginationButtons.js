"use client";
import React from "react";
import { useRouter } from "next/navigation";

const PaginationButtons = ({ currentPageNumber, totalPages }) => {
  currentPageNumber = currentPageNumber || 1;
  const router = useRouter();
  const handlePreviousButton = () => {
    if (currentPageNumber <= 1) {
      return;
    }

    router.push(`/?page=${parseInt(currentPageNumber) - 1}`);
  };

  const handleNextButton = () => {
    if (currentPageNumber >= totalPages) {
      return;
    }
    router.push(`/?page=${parseInt(currentPageNumber) + 1}`);
  };
  return (
    <div className="flex justify-between items-center my-11">
      <button
        onClick={handlePreviousButton}
        className={`border-2 border-gray-600/70 rounded-none bg-transparent text-gray-800 px-6 py-2 ${
          currentPageNumber <= 1 ? "opacity-0" : ""
        }`}
      >
        Prev
      </button>
      <button
        onClick={handleNextButton}
        className={`border-2 border-gray-600/70 rounded-none bg-transparent px-6 py-2 text-gray-800 ${
          totalPages <= currentPageNumber ? "opacity-0" : ""
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
