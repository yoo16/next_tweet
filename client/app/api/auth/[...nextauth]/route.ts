import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthUser } from '@/app/services/UserService';

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
        // CredentialsProvider({
        //     name: "Sign in",
        //     credentials: {
        //         email: {
        //             label: "Email",
        //             type: "email",
        //             placeholder: "Email",
        //         },
        //         password: { label: "Password", type: "password" },
        //     },
        //     async authorize(credentials) {
        //         console.log("Credentials: ", credentials);
        //         var email = credentials?.email;
        //         var password = credentials?.password;
        //         if (!email || !password) return;
        //         const user = await AuthUser(email, password);
        //         return user;
        //     }
        // }
        // ),
    ],
    callbacks: {
        jwt: async ({ token, account, user }) => {
            console.log('jwt:', { user, token, account })

            if (user) {
                token.user = user;
                const u = user as any
                token.role = u.role;
            }
            if (account) {
                token.accessToken = account.access_token
            }
            return token;
        },
        // session: ({ session, token }) => {
        //     console.log("in session", { session, token });
        //     token.accessToken
        //     return {
        //         ...session,
        //         user: {
        //             ...session.user,
        //             role: token.role,
        //         },
        //     };
        // },
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }