import Post from "@/utils/Models/Post";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HiArrowUpRight } from "react-icons/hi2";
import db from "@/utils/Database/db";
import { MDXRemote } from "next-mdx-remote/rsc";
import User from "@/utils/Models/User";
import { formatDate, formatDateOnly, formatTimeOnly } from "@/utils/formatting";
import PaginationButtons from "./PaginationButtons";

const Feed = async ({ currentPageNumber }) => {
  await db.connect();
  const currentPage = currentPageNumber || 1;
  const pageSize = 6;
  const skip = (currentPage - 1) * pageSize;

  let totalPage;
  const post = await Post.find({}).limit(pageSize).skip(skip);
  const documents = await Post.countDocuments({});
  totalPage = Math.ceil(documents / pageSize);

  return (
    <>
      {!post ? (
        <div>No post avaible</div>
      ) : (
        <div>
          <div className=" grid grid-cols-1 sm:grid-cols-2 gap-5 ">
            {post.map((item) => (
              <PostContainer key={item._id} item={item} />
            ))}
          </div>
          <PaginationButtons
            currentPageNumber={currentPageNumber}
            totalPages={totalPage}
          />
        </div>
      )}
    </>
  );
};

export const PostContainer = async ({ item }) => {
  await db.connect();
  const user = await User.findOne({ _id: item.publisher });
  console.log(user);

  return (
    <div className="flex flex-col w-full">
      <div className=" relative w-full h-56  ">
        <Image
          src={item.images.imageName}
          alt="joe"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          width={100}
          height={100}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 w-full   h-[30%] glass text-white px-4 py-2 flex justify-between">
          <div>
            <h1>{user && user.name}</h1>
            <p>
              {item.createdAt ? formatDateOnly(item.createdAt) : "20 jan 2024"}
            </p>
          </div>
          <div>
            <h1>{item.category}</h1>
          </div>
        </div>
      </div>
      <h1 className="text-xl md:text-2xl font-semibold py-2 md:py-2 line-clamp-1">
        {item.title}
      </h1>
      <div className=" line-clamp-2 text-gray-800 font-semibold mb-2  ">
        {item.content}
      </div>
      <Link
        href={`/post/${item.slug}`}
        className="font-bold text-lg flex items-center space-x-2"
      >
        <p>Read more</p>
        <HiArrowUpRight color="black" size={14} strokeWidth={2} />
      </Link>
    </div>
  );
};

export default Feed;
