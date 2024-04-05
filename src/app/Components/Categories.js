import Category from "@/utils/Models/Category";
import React from "react";
import db from "@/utils/Database/db";

const Categories = async () => {
  await db.connect();
  const categories = await Category.find({});

  return (
    <div className="w-full py-3 px-4 flex flex-col bg-gray-200 gap-5">
      <h1 className="text-3xl font-semibold ">Categories</h1>

      <div className="space-y-4">
        {categories.map((category, id) => (
          <div key={id} className="border-b border-gray-700/40 py-3">
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
