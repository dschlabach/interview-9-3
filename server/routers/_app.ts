import { z } from "zod";
import { procedure, router } from "../trpc";
import { userRouter } from "./users"; // Add this import
import { adminRouter } from "@/server/routers/admin";

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  users: userRouter,
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
