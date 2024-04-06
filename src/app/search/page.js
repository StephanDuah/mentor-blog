import db from "@/utils/Database/db";
import Post from "@/utils/Models/Post";
import { getRegex } from "@/utils/formatting";
import React from "react";
import { PostContainer } from "../Components/Feed";
import AsideLayout from "../Components/AsideLayout";

const page = async ({ searchParams }) => {
  await db.connect();
  const pattern = new RegExp(searchParams.title, "i");
  const data = await Post.find({ title: { $regex: pattern } });

  return (
    <AsideLayout>
      <section className="col-span-2 w-full">
        <h1 className="text-xl font-bold mb-5">
          Search Results {`(${data.length})`}
        </h1>
        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-5 ">
          {data.map((item) => (
            <PostContainer item={item} key={item._id} />
          ))}
        </div>
      </section>
    </AsideLayout>
  );
};

export default page;
