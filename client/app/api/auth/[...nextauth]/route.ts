import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authUser, tokenUser } from '@/app/services/UserService';

export const authOptions: NextAuthOptions = {
    debug: true,
    session: { strategy: "jwt" },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        CredentialsProvider({
            id: 'user', name: 'User', credentials: {
                email: { label: 'メールアドレス', type: 'email', placeholder: 'メールアドレス' },
                password: { label: 'パスワード', type: 'password', placeholder: 'パスワード' }
            },
            async authorize(credentials) {
                var authResult = await authUser(credentials)
                var accessToken = authResult.access_token
                console.log("access_token:", accessToken)
                if (accessToken) {
                    var user = await tokenUser(accessToken);
                    console.log("user:", user)
                    if (user) {
                        user.accessToken = accessToken;
                        return user
                    }
                }
                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // console.log("token:", token)
            // console.log("User:", user)
            return { ...token, ...user }
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }