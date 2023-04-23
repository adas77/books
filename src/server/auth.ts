import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcrypt';
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "~/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, token }) {
      if (session?.user && token.sub) {
        session.user.id = token.sub;
      }
      // console.log('TOKEN:', token)
      // console.log('SESSION:', session)
      return session
    },
    jwt: ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials.");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        if (!user || !user.password) {
          throw new Error("Invalid credentials.");
        }
        const correctPassword = await bcrypt.compare(credentials.password, user.password)
        if (!correctPassword) {
          throw new Error("Invalid credentials.");
        }
        return user
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

