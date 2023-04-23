import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure
} from "~/server/api/trpc";

export const reviewRouter = createTRPCRouter({
    create: protectedProcedure.
        input(z.object({
            text: z.string(),
            bookId: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            const review = await ctx.prisma.bookReview.create({
                data: {
                    text: input.text,
                    Book: { connect: { id: input.bookId } },
                    // userId: { ctx.session.user.id},
                    // users: { connect: { : ctx.session.user.id } },
                }
            })
            return review
        }),

});