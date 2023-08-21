import React from "react";

const Categories = () => {
  const categories = [
    {
      name: "Sports",
    },
    {
      name: "LifeStyle and Fashion",
    },
    {
      name: "Entertainment",
    },
    {
      name: "News",
    },
    {
      name: "Education",
    },
    {
      name: "Health",
    },
  ];
  return (
    <div className=" mb-[4rem] space-y-4 w-[50%] ">
      <h2 className="text-3xl font-bold">Categories</h2>

      <div className="inline-flex mb-5 space-x-3 text-gray-500 whitespace-nowrap ">
        {categories.map((category, id) => (
          <p key={id} className="button">
            {category.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Categories;
