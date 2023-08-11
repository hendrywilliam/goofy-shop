import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // add public routes
  publicRoutes: [
    "/",
    "/sign-up",
    "/sign-in",
    "/experiences",
    "/online-experiences",
    "/api/(.*)",
    "/rooms/(.*)",
    "/forget-password",
    "/forget-password/(.*)",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
