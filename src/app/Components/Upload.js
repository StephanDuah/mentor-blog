"use client";
import React, { useState } from "react";
import Resizer from "react-image-file-resizer";

import Image from "next/image";

const Upload = ({ photo, id, setPhoto, setLoading }) => {
  const handleChange = (data) => {
    let files = data.target.files;
    files = [...files];

    if (files.length) {
      files.map((file) => {
        new Promise((resolve) => {
          Resizer.imageFileResizer(
            file,
            1200,
            700,
            "JPEG",
            100,
            0,
            async (uri) => {
              try {
                setLoading(true);
                const res = await fetch(
                  "/api/upload",
                  {
                    body: JSON.stringify({ image: uri }),
                    method: "POST",
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                const response = await res.json();
                console.log(response);
                if (response.status === "ok") {
                  setLoading(false);
                  console.log(response.data);
                  setPhoto(response.data);
                  console.log("ok");
                } else {
                  setLoading(false);
                  console.log(response);
                }
              } catch (e) {
                setLoading(false);
                console.log("something went wrong!");
                console.log(e);
              }
            }
          );
        });
      });
    }
  };
  return (
    <input
      type="file"
      id={id}
      hidden
      onChange={handleChange}
      max={1}
      disabled={photo}
    />
  );
};

export default Upload;
