import { categories } from "@/utils/data";
import db from "@/utils/Database/db";
import Category from "@/utils/Models/Category";
import { NextResponse } from "next/server";
export const GET = async () => {
  try {
    await db.connect();
    const newCategory = await Category.insertMany(categories);
    await db.disconnect();
    return NextResponse.json(newCategory);
  } catch (error) {
    console.log(error);
  }
};
