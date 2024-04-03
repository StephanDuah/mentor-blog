import React from "react";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import db from "@/utils/Database/db";
import User from "@/utils/Models/User";
import argon2 from "argon2";

export const authOptions = {};
const handler = NextAuth({
  strategy: "jwt",

  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email please",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize({ email, password }, req) {
        await db.connect();
        const userEmail = await User.findOne({ email });
        const userPhone = await User.findOne({ phone: email });

        const user = userEmail || userPhone;

        console.log(user);

        const verify = await argon2.verify(user.password, password);

        if (!user || !verify) {
          throw new Error("Invalid Credentials");
        }

        return user;
      },
    }),
    GitHubProvider({
      profile(profile) {
        console.log("git ", profile);
      },

      clientId: process.e,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      return {
        ...session,
        ...token,
      };
    },
  },
});
export { handler as GET, handler as POST };
