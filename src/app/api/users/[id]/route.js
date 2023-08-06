import db from "@/utils/Database/db";
import User from "@/utils/Models/User";
import { NextResponse } from "next/server";

export const PATCH = async (req, ctx) => {
  const body = await req.json();
  const email = await ctx.params.id;
  try {
    await db.connect();
    await User.updateOne({ email }, body);
    await db.disconnect();

    return NextResponse.json("Update Successfully");
  } catch (error) {
    console.log(error);

    NextResponse.json(error);
  }
};
