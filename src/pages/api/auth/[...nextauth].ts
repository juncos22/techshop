import { firebaseConfig } from "@/lib/firebaseConfig";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: "Username" },
                password: { label: 'Password', type: 'password', placeholder: "Password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                console.log(credentials);

                const user = { id: '1', name: "Roberto", email: "jsmith@example.com" }

                if (user) return user
                return null
            },
        })
    ],
    adapter: FirestoreAdapter(firebaseConfig),
    callbacks: {
        session({ session, token, user }) {
            console.log(session, token, user);
            return session // The return type will match the one returned in `useSession()`
        },
    },
    pages: {
        signIn: "/auth/login",
        error: "/error",
    }
})