import LoginLayoutComponent from '@/components/LoginLayoutComponent'
import { User } from '@/models/user.model'
import { useAccountStore } from '@/store/account'
import { Alert, Avatar, Box, Button, CircularProgress, InputLabel, TextField, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { nextAuthOptions } from '../api/auth/[...nextauth]'

export default function LoginPage() {
    const [formData, setFormData] = useState<User>({
        name: '',
        password: ''
    })
    const accountStore = useAccountStore()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        accountStore.signIn(formData.name, formData.password!)
    }
    const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    return (
        <LoginLayoutComponent>
            <Box onSubmit={handleSubmit} component={'form'} sx={{ border: 1, borderColor: 'green', color: 'white', borderRadius: 3, m: 'auto', px: 5, py: 3, my: 10 }}>

                <Avatar alt="Remy Sharp" src={'/favicon.ico'} sx={{ border: 1, borderColor: 'green', objectFit: 'cover', p: 2, width: 80, height: 80, m: 'auto' }} />

                <Typography variant='h3' sx={{ textAlign: 'center' }} color={'green'}>
                    Sign In
                </Typography>

                <InputLabel sx={{ color: 'white' }} htmlFor="inputUsername">Username</InputLabel>
                <TextField
                    id='inputUsername'
                    variant='outlined'
                    fullWidth
                    name='name'
                    required
                    value={formData.name}
                    type={'text'}
                    onChange={handleForm}
                    size={'medium'}
                    color='success'
                    sx={{ my: 2, input: { color: 'white', border: 1, borderRadius: 1, borderColor: 'green', fontSize: 18 }, borderRadius: 1, borderColor: 'white' }} />

                <InputLabel sx={{ color: 'white' }} htmlFor="inputPassword">Password</InputLabel>
                <TextField
                    id='inputPassword'
                    variant='outlined'
                    fullWidth
                    name='password'
                    required
                    color='success'
                    value={formData.password}
                    onChange={handleForm}
                    type={'password'}
                    sx={{ my: 2, input: { color: 'white', border: 1, borderRadius: 1, borderColor: 'green', fontSize: 18 }, borderRadius: 1, color: 'white', borderColor: 'white' }}
                    size={'medium'} />

                {
                    !accountStore.loading && (
                        <Button color='success' type='submit' variant='contained' fullWidth size='large'>Login</Button>
                    )
                }
                {
                    accountStore.loading && (
                        <CircularProgress size={30} color={'success'} />
                    )
                }
                {
                    accountStore.error && (
                        <Alert color='error' variant='outlined'>{accountStore.error}</Alert>
                    )
                }

                <Typography variant='body1' sx={{ mt: 2 }}>Doesn't have an account? <Link style={{ textDecoration: 'none', color: 'green', fontWeight: 'bold' }} href={'/auth/register'}>Register</Link></Typography>
            </Box>
        </LoginLayoutComponent>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const session = await getServerSession(ctx.req, ctx.res, nextAuthOptions)
        console.log(session);

        if (session) return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    } catch (error: any) {
        console.log(error.message);

        return {
            redirect: {
                destination: "/error",
                permanent: false,
                statusCode: 500
            }
        }
    }
    return {
        props: {}
    }
}
