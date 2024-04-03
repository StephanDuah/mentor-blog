import Post from "@/utils/Models/Post";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HiArrowUpRight } from "react-icons/hi2";
import db from "@/utils/Database/db";
import { MDXRemote } from "next-mdx-remote/rsc";
import User from "@/utils/Models/User";
import { formatDate, formatDateOnly, formatTimeOnly } from "@/utils/formatting";

const Feed = async () => {
  await db.connect();
  const post = await Post.find({});

  return (
    <>
      {!post ? (
        <div>No post avaible</div>
      ) : (
        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-[4rem] py-10">
          {post.map((item) => (
            <PostContainer key={item._id} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

const PostContainer = async ({ item }) => {
  await db.connect();
  const user = await User.findOne({ _id: item.publisher });

  return (
    <div className="flex flex-col">
      <div className=" relative w-full h-72  ">
        <Image
          src={item.images.imageName}
          alt="joe"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          width={100}
          height={100}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 w-full   h-[30%] glass text-white px-4 py-6 flex justify-between">
          <div>
            <h1>{user.name}</h1>
            <p>
              {item.createdAt ? formatDateOnly(item.createdAt) : "20 jan 2024"}
            </p>
          </div>
          <div>
            <h1>Design</h1>
          </div>
        </div>
      </div>
      <h1 className="text-2xl md:text-4xl font-semibold py-3 md:py-5 ">
        {item.title}
      </h1>
      <div className=" line-clamp-2  leading-[1.9rem]">
        <MDXRemote
          source={`# Hello World

This is from Server Components!
`}
        />
      </div>
      <Link
        href={`/user/posts/${item.slug}`}
        className="font-bold text-lg flex items-center space-x-2"
      >
        <p>Read more</p>
        <HiArrowUpRight color="black" size={14} strokeWidth={2} />
      </Link>
    </div>
  );
};

export default Feed;
