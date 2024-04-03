import Category from "@/utils/Models/Category";
import { NextResponse } from "next/server";
import db from "@/utils/Database/db";
export const GET = async () => {
  try {
    await db.connect();
    const categories = await Category.find({});

    return NextResponse.json(categories);
  } catch (error) {
    console.log(error);
  }
};
