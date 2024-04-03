import db from "@/utils/Database/db";
import Post from "@/utils/Models/Post";

import { NextResponse } from "next/server";
export const GET = async () => {
  try {
    await db.connect();
    const user = await Post.find({});

    if (!user) {
      return NextResponse.json("No user found");
    }
    return NextResponse.json(user);
  } catch (error) {
    NextResponse.json();
  }
};

export const POST = async (req) => {
  const body = await req.json();
  try {
    await db.connect();
    const user = await Post(body);
    await user.save();

    return NextResponse.json("your are registered");
  } catch (error) {
    console.log(error);
    NextResponse.json(error);
  }
};
