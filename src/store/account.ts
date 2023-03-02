import { api } from "@/lib/axios"
import { db } from "@/lib/firebaseConfig"
import { Response } from "@/models/response.model"
import { User, userConverter } from "@/models/user.model"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { create } from "zustand"
import { signIn, signOut } from "next-auth/react";

type AccountStates = {
    user: User
    loading: boolean
    error: string
}

type AccountActions = {
    signIn: (username: string, password: string) => void
    signOut: () => void
    signUp: (user: User) => void
    getProfile: (username: string) => void
}

export const useAccountStore = create<AccountStates & AccountActions>(
    (set) => (
        {
            user: {
                name: "",
            },
            error: "",
            loading: false,
            async signIn(username, password) {
                try {
                    set(state => ({
                        loading: true
                    }))
                    const data = await signIn("credentials", { username, password, redirect: false })
                    console.log(data);

                } catch (error: any) {
                    set(state => ({
                        error: error.message
                    }))
                } finally {
                    set(state => ({
                        loading: false
                    }))
                }
            },
            async signOut() {
                await signOut({
                    redirect: true
                })
            },
            async signUp(user) {
                try {
                    set(state => ({
                        loading: true
                    }))
                    const ref = doc(db, 'users', user.name).withConverter(userConverter)
                    await setDoc(ref, user)
                } catch (error: any) {
                    set(state => ({
                        error: error.message
                    }))
                } finally {
                    set(state => ({
                        loading: false
                    }))
                }
            },
            async getProfile(username) {
                try {
                    set(state => ({
                        loading: true
                    }))
                    const ref = doc(db, 'users', username).withConverter(userConverter)
                    const docSnap = await getDoc(ref)
                    set(state => ({
                        user: docSnap.data()
                    }))
                } catch (error: any) {
                    set(state => ({
                        error: error.message
                    }))
                } finally {
                    set(state => ({
                        loading: false
                    }))
                }
            },
        }
    )
)