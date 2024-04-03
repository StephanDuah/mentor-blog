import React from "react";
import Image from "next/image";

import { HiClock } from "react-icons/hi";
import Post from "@/utils/Models/Post";
import DisplayRichText from "@/app/Components/DisplayRichText";
import db from "@/utils/Database/db";
import { MDXRemote } from "next-mdx-remote/rsc";
import MdxFormatter from "@/app/Components/MdxFormatter";
import { formatDateOnly } from "@/utils/formatting";
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

  return (
    <article className="mx-auto p-8 max-w-[1248px]">
      {post && (
        <section className="relative w-full h-72 ">
          <Image
            src={post.images.imageName}
            alt="details"
            width={100}
            height={100}
            className="w-full h-full   object-cover "
            priority
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/30  backdrop-blur-sm text-white p-8">
            <div className="flex flex-col gap-4 md:flex-row justify-between">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold capitalize  ">
                  {post.title}
                </h1>
                <p className="flex gap-1 items-center">
                  <HiClock />{" "}
                  <span>
                    {post.createdAt
                      ? formatDateOnly(post.createdAt)
                      : "20 jan 2023"}
                  </span>
                </p>
              </div>
              <div className="">
                <h1 className="text-xl font-semibold capitalize  ">
                  Kwaku Duah
                </h1>
                <div>dfskdfsalkldksflakldskl</div>
              </div>
            </div>
          </div>
        </section>
      )}
      <h1 className="text-center my-11 text-4xl md:text-6xl font-bold">
        {post.title}
      </h1>
      <div>
        <Image
          src={post.images.imageName}
          alt="details"
          width={1000}
          height={100}
          className="w-full h-full   object-cover "
          priority
        />
      </div>

      <MdxFormatter source={post.content} />
    </article>
  );
};

export default Details;
