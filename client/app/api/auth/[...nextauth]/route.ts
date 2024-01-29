import { redirect } from 'next/navigation';
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";

import { signIn, getUser } from '@/app/services/UserService';
import { Session } from "next-auth";

export const authOptions: NextAuthOptions = {
    debug: false,
    pages: {
        signIn: '/auth/login',
        error: '/auth/login',
    },
    session: { strategy: "jwt" },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID!,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        // }),
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Email' },
                password: { label: 'Password', type: 'password', placeholder: 'Password' }
            },
            async authorize(credentials) {
                console.log("authorize():", credentials)
                if (!credentials?.email || !credentials?.password) return;

                const email = credentials?.email || "";
                const password = credentials?.password || "";
                const result = await signIn({ email, password });

                if (result?.access_token) {
                    const user = getUser(result?.access_token);
                    return user;
                }
                return false;
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log('--- signIn ---')
            console.log(user)
            return true;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token }) {
            session.user = token as Session["user"];
            return session;
        },
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }