import db from "@/utils/Database/db";
import User from "@/utils/Models/User";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  try {
    await db.connect();
    const user = await User(body);
    await user.save();

    await db.disconnect();

    return NextResponse.json("your are registered");
  } catch (error) {
    console.log(error);
    NextResponse.json(error);
  }
};
