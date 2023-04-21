import { createTRPCRouter } from "~/server/api/trpc";
import { booksRouter } from "./routers/books";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
    books: booksRouter,
    user: userRouter,
});

export type AppRouter = typeof appRouter;
