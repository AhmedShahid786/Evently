import { z } from "zod";

export const categoryShema = z.object({
  title: z.string(),
  description: z.string(),
  thumbnail: z.any()
});