import User from "@/utils/Models/User";
import { NextResponse } from "next/server";
import db from "@/utils/Database/db";
export const GET = async () => {
  try {
    await db.connect();
    const user = await User.find({});
    await db.disconnect();
    if (!user) {
      return NextResponse.json("No user found");
    }
    return NextResponse.json(user);
  } catch (error) {
    NextResponse.json();
  }
};
