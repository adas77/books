import { BookType } from "@prisma/client";
import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure
} from "~/server/api/trpc";

export const booksRouter = createTRPCRouter({
    getAll: protectedProcedure.query(async ({ ctx }) => {
        const id = ctx.session.user.id
        const user = await ctx.prisma.user.findUnique({ where: { id: id }, include: { books: true } })
        return user?.books
    }),
    search: protectedProcedure
        .input(z.object({ search: z.string() }))
        .query(async ({ input, ctx }) => {
            if (input.search.length <= 0) return;
            const books = await ctx.prisma.book.findMany({ where: { id: { contains: input.search } } })
            return books
        }),
    create: protectedProcedure.
        input(z.object({
            isbn: z.string().min(10).max(13),
            authorsIds: z.string().array().optional(),
            bookType: z.enum([BookType.ACTION, BookType.ADVENTURE,
            BookType.COMIC, BookType.DETECTIVE, BookType.FANTASY, BookType.HISTORICAL, BookType.HORROR]),
            img: z.string().optional(),
        }))
        .mutation(async ({ input, ctx }) => {
            const book = await ctx.prisma.book.create({
                data: {
                    isbn: input.isbn,
                    type: input.bookType,
                    img: input.img,
                    authors: { connect: input.authorsIds?.map(a => ({ id: a })) || [] },
                }
            })
            return book
        })
});