import { createTRPCRouter } from "~/server/api/trpc";
import { booksRouter } from "./routers/books";
import { reviewRouter } from "./routers/review";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
    books: booksRouter,
    user: userRouter,
    reviews: reviewRouter,
});

export type AppRouter = typeof appRouter;
