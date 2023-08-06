import Post from "@/utils/Models/Post";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HiArrowUpRight } from "react-icons/hi2";
import db from "@/utils/Database/db";

const Feed = async () => {
  await db.connect();
  const post = await Post.find({});
  await db.disconnect();
  return (
    <>
      {!post ? (
        <div>No post avaible</div>
      ) : (
        <div className="mt-9 px-8 py-3 mx-auto max-w-[1248px] grid grid-cols-1 sm:grid-cols-2 gap-[4rem]">
          {post.map((item) => (
            <div key={item._id} className="flex flex-col">
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
                    <h1>Kwaku duah</h1>
                    <p>20 Jan 2022</p>
                  </div>
                  <div>
                    <h1>Design</h1>
                  </div>
                </div>
              </div>
              <h1 className="text-2xl md:text-4xl font-semibold py-3 md:py-5 ">
                {item.title}
              </h1>
              <div className="leading-[1.9rem]">
                <p>
                  Pariatur ex consequat Lorem voluptate esse do et dolor labore
                  ad ullamco mollit occaecat ipsum. Deserunt cupidatat excepteur
                  irure id sunt ullamco. Esse incididunt Lorem eu mollit.
                </p>

                <Link
                  href={`/user/posts/${item.slug}`}
                  className="font-bold text-lg flex items-center space-x-2"
                >
                  <h1>Read more</h1>
                  <HiArrowUpRight color="black" size={14} strokeWidth={2} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Feed;
