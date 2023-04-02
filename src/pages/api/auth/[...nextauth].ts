import { db } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    logger: {
        error(code, metadata) {
            console.log("NEXTAUTH ERROR");
            console.error(code, metadata);
        },
        warn(code) {
            console.log("NEXTAUTH WARNING");
            console.log(code);
        },
        debug(code, metadata) {
            console.log("NEXTAUTH DEBUG");
            console.error(code, metadata);
        },
    },
    debug: process.env.NODE_ENV === 'development',
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
                    name: user?.username,
                    email: user?.email
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
        async session({ session, token, user }) {
            console.log(session);

            // const account = await db.user.findUnique({
            //     where: {
            //         id: session.user.id
            //     }
            // })
            // console.log(account);

            // session = { ...session, user: { ...session.user, id: user.id } }
            return session // The return type will match the one returned in `useSession()`
        },
    },
    pages: {
        signIn: "/auth/login",
        error: "/error",
    }
}
export default NextAuth(nextAuthOptions)