import { z } from "zod";
import { procedure, router } from "../trpc";
import { userRouter } from "./users"; // Add this import

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
  users: userRouter, // Add this line to include the userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
