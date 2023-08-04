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
    "/test-table/(.*)",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
