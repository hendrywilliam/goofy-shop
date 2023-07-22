import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { UploadThingRouter } from "@/app/api/uploadthing/core";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<UploadThingRouter>();
