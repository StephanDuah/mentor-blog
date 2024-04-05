import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const AllPosts = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {Array(6)
        .fill(0)
        .map((_, id) => (
          <div className="space-y-3" key={id}>
            <Skeleton className="w-full h-56 rounded-none" />
            <Skeleton className="h-6 w-full rounded-none" />
            <Skeleton className="h-3 w-[70%] rounded-none" />
            <Skeleton className="h-3 w-[50%] rounded-none" />
          </div>
        ))}
    </div>
  );
};

export default AllPosts;
