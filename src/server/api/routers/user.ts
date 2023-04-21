import { TRPCError } from "@trpc/server";
import bcrypt from 'bcrypt';
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    registerWithCredentials: publicProcedure.
        input(z.object({
            email: z.string().email(),
            password: z.string().min(8).max(64),
            confirmPassword: z.string().min(8).max(64),
            img: z.string().optional(),
            name: z.string().optional(),
        })
            .refine((data) => data.password === data.confirmPassword, {
                message: "Password doesn't match",
                path: ["confirmpassword"]
            })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                const hashedPassword = await bcrypt.hash(input.password, 10);
                const user = await ctx.prisma.user.create({
                    data: {
                        email: input.email,
                        password: hashedPassword,
                        image: input.img,
                        name: input.name,
                    }
                })
                return user;

            }
            catch (error) {
                throw new TRPCError({ code: "CONFLICT", message: "Email already used" })
            }
        })
});