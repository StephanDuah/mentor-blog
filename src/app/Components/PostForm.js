"use client";
import React, { useState, useEffect } from "react";
import Upload from "./Upload";
import { HiUpload } from "react-icons/hi";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { Editor } from "novel-lightweight";

const PostForm = () => {
  const { data: Session } = useSession();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "", // New state for selected category
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/category");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitLoading(true);
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          images: photo,
          slug: slugify(form.title),
          publisher: Session.sub,
        }),
      });
      setSubmitLoading(false);
      if (!res.ok) {
        throw new Error("Failed to submit post");
      }
      const responseData = await res.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm((prevForm) => ({
      ...prevForm,
      title,
      slug: slugify(title),
    }));
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setForm((prevForm) => ({
      ...prevForm,
      category,
    }));
  };

  return (
    <div className="max-w-[1284px] mt-11 mx-auto space-y-11 px-8 py-11">
      <h1 className="text-4xl">Publish</h1>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div>
          <h1>Cover</h1>
          <label htmlFor="photo">
            {!photo ? (
              <div className="w-full bg-gray-200 h-36 md:h-96 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  {!loading ? (
                    <>
                      <HiUpload size={30} />
                      <h3>Upload</h3>
                    </>
                  ) : (
                    <>
                      <ClipLoader color="black" size={30} />
                      <h3>loading...</h3>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-36 md:h-96">
                <Image
                  src={photo.imageName}
                  alt="cover"
                  width={1200}
                  height={700}
                  className="w-full h-full object-cover object-center "
                  priority
                />
              </div>
            )}
          </label>
          <Upload
            id={"photo"}
            setLoading={setLoading}
            setPhoto={setPhoto}
            photo={photo}
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="px-2 py-4 bg-gray-100/30 outline-none border border-gray-300"
            id="title"
            value={form.title}
            onChange={handleTitleChange}
          />
        </div>

        <div className="space-y-2 flex flex-col">
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            className="px-2 py-4 bg-gray-100/30 outline-none border border-gray-300"
            id="slug"
            value={form.slug}
            readOnly
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={form.category}
            onChange={handleCategoryChange}
            className="px-2 py-4 bg-gray-100/30 outline-none border border-gray-300"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2 flex flex-col">
          <label htmlFor="desc">Description</label>
          <Editor
            defaultValue={form.content}
            className="w-100 border border-gray-300/50 min-h-[500px]"
            disableLocalStorage={true}
            onUpdate={(editor) => {
              setForm({
                ...form,
                content: editor?.storage.markdown.getMarkdown(),
              });
            }}
            handleImageUpload={async (file) => {
              const uploads = await startUpload([file]);
              return uploads && uploads.length > 0
                ? uploads[0].url
                : "www.example.com/failed-upload.png";
            }}
          />
        </div>
        <button className="px-4 py-2 bg-black text-white active:scale-95 transition-transform duration-200 mt-[6rem]">
          {submitLoading ? <ClipLoader color="white" size={28} /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export default PostForm;
