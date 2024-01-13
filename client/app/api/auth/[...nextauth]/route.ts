import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authUser, tokenUser, createToken } from '@/app/services/UserService';

export const authOptions: NextAuthOptions = {
    session: { strategy: "jwt" },
    providers: [
        // GitHubProvider({
        //     clientId: process.env.GITHUB_ID!,
        //     clientSecret: process.env.GITHUB_SECRET!,
        // }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID!,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        // }),
        CredentialsProvider({
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Email' },
                password: { label: 'Password', type: 'password', placeholder: 'Password' }
            },
            async authorize(credentials) {
                const authResult = await authUser(credentials)
                const accessToken = authResult.access_token
                console.log("access_token:", accessToken)
                if (accessToken) {
                    const user = await tokenUser(accessToken);
                    user.accessToken = accessToken;
                    return user
                }
                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            console.log("jwt:", token, user)
            return { ...token, ...user }
        },
        async session({ session, token }) {
            session.user = token as any;
            console.log("session:", session, token)
            return session;
        },
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }