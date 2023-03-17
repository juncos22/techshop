import { db } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: "Username" },
                password: { label: 'Password', type: 'password', placeholder: "Password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                // console.log("Login data", credentials);
                const user = await db.user.findFirst({
                    where: {
                        username: credentials?.username,
                        password: credentials?.password
                    }
                })

                if (!user) return null
                return {
                    id: user?.id,
                    email: user?.email,
                    name: user.username
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    adapter: PrismaAdapter(db),
    callbacks: {
        // signIn({ user, account, credentials }) {
        //     console.log("Signin data: ", user, account, credentials);
        //     return true
        // },
        session({ session, token, user }) {
            console.log(session, token, user);
            return session // The return type will match the one returned in `useSession()`
        },
    },
    pages: {
        signIn: "/auth/login",
        error: "/error",
    }
}
export default NextAuth(nextAuthOptions)