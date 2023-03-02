import { auth, db, firebaseConfig } from "@/lib/firebaseConfig";
import { userConverter } from "@/models/user.model";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { signInWithCredential, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
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
                console.log("Login data", credentials);
                const ref = doc(db, 'users', credentials?.username!).withConverter(userConverter)
                const docSnap = await getDoc(ref)
                const user = docSnap.data()
                if (user) {
                    const userCredential = await signInWithEmailAndPassword(auth, user.email!, user.password!)
                    console.log(userCredential);
                    return {
                        name: userCredential.user!.displayName,
                        email: userCredential.user!.email,
                        id: ""
                    }
                }

                return null
            },
        })
    ],
    adapter: FirestoreAdapter(firebaseConfig),
    callbacks: {
        signIn({ user, account, credentials }) {

            console.log(user, account, credentials);
            return true
        },
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