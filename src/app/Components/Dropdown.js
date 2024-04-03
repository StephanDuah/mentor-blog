import Category from "@/utils/Models/Category";
import React from "react";

const Dropdown = async ({ setCategories }) => {
  const categories = await Category.find({});
  return (
    <select onOnchange={() => console.log(e.value.target)}>
      {categories &&
        categories.map((category) => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
    </select>
  );
};

export default Dropdown;
