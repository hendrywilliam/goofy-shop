import { currentUser } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

//initiate upload thing
const f = createUploadthing();

export const uploadFileRouter = {
  /**
   * createUploadThing => f(FileRouterInputConfig) => UploadBuilder(input, middleware,onUploadComplete)
   * - createUploadThing invoked
   * - f is a fn that accepts (input), input = FileRouterInputConfig
   * - FileRouterInputConfig =
   * - f returns UploadBuilder (input, middleware, onUploadComplete)
   */

  //set max file size
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      //return user object (id, firstName, emailAddresses)
      const isAuthenticated = await currentUser();

      if (!isAuthenticated)
        throw new Error("Unauthorized, please login before proceed");

      //accessable in onUploadComplete as "metadata"
      return {
        user_id: isAuthenticated.id,
      };
    })
    .onUploadComplete(async (resolver) => {
      console.log(
        "Upload complete for user with id:",
        resolver.metadata.user_id
      );
      console.log("File url");
    }),
} satisfies FileRouter;

export type UploadThingRouter = typeof uploadFileRouter;
