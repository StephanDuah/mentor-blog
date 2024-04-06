import React from "react";
import Image from "next/image";

import { HiClock } from "react-icons/hi";
import Post from "@/utils/Models/Post";
import DisplayRichText from "@/app/Components/DisplayRichText";
import db from "@/utils/Database/db";
import { MDXRemote } from "next-mdx-remote/rsc";
import MdxFormatter from "@/app/Components/MdxFormatter";
import { formatDateOnly } from "@/utils/formatting";
import { Suspense } from "react";
import Categories from "@/app/Components/Categories";
import Searchbar from "@/app/Components/Searchbar";
import PopularPost from "@/app/Components/PopularPost";
import User from "@/utils/Models/User";
import AsidebarLoader from "@/app/Components/LoadingSkeletons/AsidebarLoader";
import ReactMarkdown from "react-markdown";
import AsideLayout from "@/app/Components/AsideLayout";
export const revalidate = 60;

export async function generateStaticParams() {
  await db.connect();
  const posts = await Post.find({});

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const Details = async ({ params }) => {
  await db.connect();
  const post = await Post.findOne({ slug: params.slug });
  const user = await User.findOne({ _id: post.publisher });

  return (
    <AsideLayout>
      {post && (
        <div className="col-span-2 space-y-4">
          <div>
            <Image
              src={post.images.imageName}
              alt="details"
              width={1000}
              height={100}
              className="w-full max-h-[500px]   object-cover "
              priority
            />
          </div>
          <h1 className="text-xl my-4 md:text-3xl font-semibold">
            {post.title}
          </h1>
          <p className=" text-gray-700 font-semibold">{`By ${
            user.name
          }  - ${formatDateOnly(post.createdAt)} - ${post.category}`}</p>
          <div className="max-w-full leading-relaxed space-y-4 break-words">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      )}
    </AsideLayout>
  );
};

export default Details;
