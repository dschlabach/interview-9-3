import { z } from "zod";
import { procedure, router } from "@/server/trpc";
import { prisma } from "@/utils/db";

export const adminRouter = router({
  updateOnboardingConfig: procedure
    .input(
      z.object({
        config: z.array(z.array(z.string())),
        pageNumber: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { config, pageNumber } = input;
      console.log("pageNumber:", pageNumber);
      console.log("config:", config);

      try {
        // Update the database with the new configuration
        await prisma.pageComponent.upsert({
          where: { pageNumber },
          update: { components: config },
          create: { pageNumber, components: config },
        });

        return { message: "Configuration updated successfully" };
      } catch (error) {
        console.error("Error updating configuration:", error);
        throw error;
      }
    }),
});
