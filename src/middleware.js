export const pages = {
  signIn: "/api/auth/signin",
  error: "/api/auth/error",
};
export { default } from "next-auth/middleware";

export const config = { matcher: ["/user/:path*"] };
