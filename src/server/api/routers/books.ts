import { BookType } from "@prisma/client";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';
import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure
} from "~/server/api/trpc";
import { saveB64ToPng } from "~/utils/image";

export const booksRouter = createTRPCRouter({
    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            const book = await ctx.prisma.book.findUnique({ where: { id: input.id }, include: { reviews: true } })
            return book;
        }),
    getAll: protectedProcedure.query(async ({ ctx }) => {
        const id = ctx.session.user.id
        const user = await ctx.prisma.user.findUnique({ where: { id: id }, include: { books: true } })
        return user?.books
    }),
    search: protectedProcedure
        .input(z.object({ search: z.string() }))
        .query(async ({ input, ctx }) => {
            if (input.search.length <= 0) return null;
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
        }),
    update: protectedProcedure.
        input(z.object({
            id: z.string(),
            bookType: z.enum([BookType.ACTION, BookType.ADVENTURE,
            BookType.COMIC, BookType.DETECTIVE, BookType.FANTASY, BookType.HISTORICAL, BookType.HORROR]).optional(),
            img: z.string().optional(),
            isbn: z.string().min(10).max(13).optional(),
        }))
        .mutation(async ({ input, ctx }) => {
            fs.mkdirSync("./public/uploads", { recursive: true });
            let uuid = undefined;
            if (input.img) {
                uuid = uuidv4();
                saveB64ToPng(input.img, uuid)
            }
            const book = await ctx.prisma.book.update({
                where: { id: input.id },
                data: {
                    isbn: input.isbn,
                    type: input.bookType,
                    img: uuid,
                }
            })
            return book
        }),
});