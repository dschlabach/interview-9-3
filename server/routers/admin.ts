import { z } from "zod";
import { procedure, router } from "@/server/trpc";
import { prisma } from "@/utils/db";

export const adminRouter = router({
  updateOnboardingConfig: procedure
    .input(
      z.array(
        z.object({
          pageNumber: z.number(),
          config: z.array(z.string()),
        })
      )
    )
    .mutation(async ({ input }) => {
      try {
        // Update the database with the new configuration
        await Promise.all(
          input.map(async ({ pageNumber, config }) => {
            await prisma.page.upsert({
              where: { pageNumber },
              update: { components: config },
              create: { pageNumber, components: config },
            });
          })
        );

        return { message: "Configuration updated successfully", success: true };
      } catch (error) {
        console.error("Error updating configuration:", error);
        return { message: "Error updating configuration", success: false };
      }
    }),

  getOnboardingConfig: procedure.query(async () => {
    return await prisma.page.findMany();
  }),
});
