import db from "@/utils/Database/db";
import User from "@/utils/Models/User";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();

  console.log(body);
  try {
    await db.connect();
    //Check for duplications
    const duplications = await User.findOne({ email: body.email });
    if (duplications) {
      console.log("Email Already Exists");
      return NextResponse.json({
        error: true,
        message: "Email Already exists",
      });
    }
    const user = await User(body);
    await user.save();

    return NextResponse.json("your are registered");
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
