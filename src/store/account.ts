import { api } from "@/lib/axios"
import { Response } from "@/models/response.model"
import { User } from "@/models/user.model"
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
    updateProfile: (account: User) => void
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
                    if (!data?.ok) {
                        set(state => ({
                            error: 'Invalid credentials'
                        }))
                        setTimeout(() => {
                            set(state => ({
                                error: ""
                            }))
                        }, 2000);
                    }

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
                    const res = await api.post<Response<User>>(`/account`, {
                        username: user.name,
                        email: user.email,
                        password: user.password
                    })
                    if (res.data.status !== 200) {
                        set(state => ({
                            error: res.data.error
                        }))
                    } else {
                        set(state => ({
                            user: res.data.data as User
                        }))
                    }
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
                    const res = await api.get<Response<User>>(`/account?name=${username}`)
                    if (res.data.status !== 200) {
                        set(state => ({
                            error: res.data.error
                        }))
                    } else {
                        set(state => ({
                            user: res.data.data as User
                        }))
                    }
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
            async updateProfile(account) {
                try {
                    set(state => ({
                        loading: true
                    }))
                    const res = await api.put<Response<User>>(`/account?id=${account.id}`, {
                        name: account.name,
                        email: account.email,
                        password: account.password
                    })
                    if (res.data.status !== 200) {
                        set(state => ({
                            error: res.data.error
                        }))
                    } else {
                        set(state => ({
                            user: res.data.data as User
                        }))
                    }
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