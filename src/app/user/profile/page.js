import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileForm from "@/app/Components/ProfileForm";
import User from "@/utils/Models/User";
const Profile = async () => {
  const session = await getServerSession(authOptions);
  const user = await User.findOne({ email: session.user.email });
  console.log(user);
  return <ProfileForm data={session.user} />;
};

export default Profile;
