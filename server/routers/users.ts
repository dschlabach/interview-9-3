import { z } from "zod";
import crypto from "crypto";
import { prisma } from "@/utils/db";
import { TRPCError } from "@trpc/server";
import { procedure, router } from "@/server/trpc";

export const userRouter = router({
  createUser: procedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password } = input;

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });
      }

      const salt = crypto.randomBytes(16).toString("hex");
      const hashedPassword = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          salt,
        },
      });

      return {
        message: "User created successfully",
        userId: newUser.id,
      };
    }),
  getUser: procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const { userId } = input;

      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not logged in",
        });
      }

      const user = await prisma.user.findUnique({ where: { id: userId } });

      return user;
    }),
});
