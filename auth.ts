import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import authConfig from '@/auth.config';
import { db } from './lib/db';
import { getUserById } from '@/data/user';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    events: {
        //update emailVerified since it comes from the trusted providers
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    callbacks: {
        //match all auth.js callbacks to /actions/login.ts|register.ts
        async signIn({ user, account }) {
            //allow oauth without email verification
            if (account?.provider !== 'credentials') return true;
            const existingUser = await getUserById(user.id);

            //prevent signin without email verification
            if (!existingUser?.emailVerified) return false;

            //TODO: add 2fa check

            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token }) {
            //if user is logged out
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;
            token.role = existingUser.role;
            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
});
