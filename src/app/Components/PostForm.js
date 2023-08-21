"use client";
import React, { useState, useEffect } from "react";
import Upload from "./Upload";
import { HiUpload } from "react-icons/hi";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import slugify from "slugify";
import { useSession } from "next-auth/react";

const PostForm = () => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { data: Session } = useSession();
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [slug, setSlug] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitLoading(true);
      const res = await fetch(
        "/api/posts",
        {
          method: "POST",
          body: JSON.stringify({
            ...form,
            images: photo,
            slug,
            publisher: Session.sub,
          }),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSubmitLoading(false);
      const responses = await res.json();
      console.log(responses);
    } catch (e) {
      setSubmitLoading(false);
      console.log(e);
    }

    console.log({ ...form, images: photo, slug });
  };

  const handleTitleChange = (e) => {
    setForm({ ...form, title: e.target.value });
  };

  useEffect(() => {
    const baseSlug = slugify(form.title, { lower: true });
    const randomNumber = Math.floor(Math.random() * 10000) + 1;
    const uniqueSlug = `${baseSlug}-${randomNumber}`;

    setSlug(uniqueSlug);
  }, [form.title]);
  return (
    <div className="max-w-[1284px] mt-11 mx-auto space-y-11 px-8 py-11">
      <h1 className="text-4xl">Publish</h1>

      <form className="" onSubmit={handleSubmit}>
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
        <div className="space-y-3 flex flex-col ">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="px-2 py-4 bg-gray-100/30 outline-none border border-gray-300"
            id="title"
            value={form.title}
            onChange={(e) => handleTitleChange(e)}
          />
        </div>
        <div className="space-y-3 flex flex-col ">
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            className="px-2 py-4 bg-gray-100/30 outline-none border border-gray-300"
            id="slug"
            value={slug}
            readOnly={true}
          />
        </div>

        <div className="space-y-3 flex flex-col   ">
          <label htmlFor="desc">Description</label>
          <textarea
            value={form.content}
            rows={10}
            className="px-2  bg-gray-100/30 outline-none border border-gray-300"
            onChange={(e) => {
              setForm({ ...form, content: e.target.value });
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

export default PostForm;
