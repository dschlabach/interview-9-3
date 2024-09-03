import { AppRouter } from "@/server/routers/_app";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
