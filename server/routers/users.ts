import { z } from "zod";
import crypto from "crypto";
import { prisma } from "@/utils/db";
import { TRPCError } from "@trpc/server";
import { procedure, router } from "@/server/trpc";
import { Prisma } from "@prisma/client";

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

  getAllUsers: procedure.query(async () => {
    const users = await prisma.user.findMany({
      include: {
        address: true,
      },
    });
    return users;
  }),

  updateUserData: procedure
    .input(
      z.object({
        userId: z.string(),
        data: z.record(z.string(), z.string()),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, data } = input;
      console.log("data:", data);

      const updateData: Prisma.UserUpdateInput = {};

      if (data.aboutMe) {
        updateData.aboutMe = data.aboutMe;
      }

      if (data.birthdate) {
        updateData.birthdate = new Date(data.birthdate);
      }

      if (data.street && data.city && data.state && data.zip) {
        updateData.address = {
          upsert: {
            create: {
              street: data.street,
              city: data.city,
              state: data.state,
              zip: data.zip,
            },
            update: {
              street: data.street,
              city: data.city,
              state: data.state,
              zip: data.zip,
            },
          },
        };
      }

      console.log("updateData:", updateData);

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });

      console.log("updatedUser:", updatedUser);

      return {
        message: "User data updated successfully",
        userId: updatedUser.id,
      };
    }),
});
