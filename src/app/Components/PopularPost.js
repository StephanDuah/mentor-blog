import db from "@/utils/Database/db";
import Post from "@/utils/Models/Post";
import { formatDateOnly } from "@/utils/formatting";
import Link from "next/link";
import React from "react";

const PopularPost = async () => {
  await db.connect();
  const posts = await Post.find({}).limit(5);
  return (
    <div className="w-full py-3 px-4 flex flex-col bg-gray-200 gap-5">
      <h1 className="text-3xl font-semibold text-gray-800 ">Popular Post</h1>
      <ul className="space-y-4">
        {posts.map((post, id) => (
          <li key={post._id}>
            <Link
              href={`/post/${post.slug}`}
              className="flex gap-4 items-start py-3"
            >
              <span className="text-4xl font-bold text-gray-800 hover:text-gray-600">
                {id + 1}
              </span>
              <div className="">
                <h3 className="text-xl font-semibold text-gray-800 hover:text-gray-600">
                  {post.title}
                </h3>
                <p className="flex items-center gap-2 text-gray-600">
                  <span>{post.category}</span>
                  <span>{formatDateOnly(post.createdAt)}</span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularPost;
