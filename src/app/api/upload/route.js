import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import streamifier from "streamifier";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});

export const POST = async (req) => {
  const body = await req.json();
  try {
    let imageName = "";
    let imageId = "";
    const uploadFromBuffer = async (req) => {
      return new Promise((resolve, reject) => {
        const cldUploadStream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(req).pipe(cldUploadStream);
      });
    };

    const result = await uploadFromBuffer(body.image);
    imageName = result.secure_url;
    imageId = result.public_id;

    return NextResponse.json({ status: "ok", data: { imageName, imageId } });
  } catch (e) {
    NextResponse.json(e);
    console.log(e);
  }
};
