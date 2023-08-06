import mongoose from "mongoose";
import argon2 from "argon2";
const userSchema = mongoose.Schema(
  {
    name: { type: String },
    avatar: {},
    bio: { type: String },
    password: { type: String },
    email: { type: String, unique: true, require: true },
    phone: { type: String },
  },
  {
    timeStamp: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await argon2.hash(user.password);
  }

  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
