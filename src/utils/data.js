import Category from "./Models/Category";

export const categories = [
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

export const getCategories = async () => {
  try {
    const category = await Category.find({});
    return category;
  } catch (error) {
    console.log(error);
  }
};
