import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure
} from "~/server/api/trpc";
import { saveB64ToPng } from "~/utils/image";

export const reviewRouter = createTRPCRouter({
    create: protectedProcedure.
        input(z.object({
            text: z.string(),
            bookId: z.string(),
            imgs: z.string().array().optional()
        }))
        .mutation(async ({ input, ctx }) => {
            const review = await ctx.prisma.bookReview.create({
                data: {
                    text: input.text,
                    imgs: input.imgs ? input.imgs.map(i => saveB64ToPng(i)) : undefined,
                    Book: { connect: { id: input.bookId } },
                    User: { connect: { id: ctx.session.user.id } }

                    // userId: ctx.session.user.id,
                    // users: { connect: { id: ctx.session.user.id } }
                }
            })
            return review
        }),

});