import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  images: {},
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
