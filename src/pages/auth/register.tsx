import LoginLayoutComponent from '@/components/LoginLayoutComponent'
import { User } from '@/models/user.model'
import { Box, Avatar, Typography, InputLabel, TextField, Button } from '@mui/material'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState } from 'react'

export default function RegisterPage() {
    const [formData, setFormData] = useState<User>({
        name: '',
        email: '',
        password: '',
    })
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData);
    }
    const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    return (
        <LoginLayoutComponent>
            <Box onSubmit={handleSubmit} component={'form'} sx={{ border: 1, borderColor: 'green', color: 'white', borderRadius: 3, m: 'auto', px: 5, py: 3, my: 10 }}>

                <Avatar alt="Remy Sharp" src={'/favicon.ico'} sx={{ border: 1, borderColor: 'green', objectFit: 'cover', p: 2, width: 80, height: 80, m: 'auto' }} />

                <Typography variant='h3' sx={{ textAlign: 'center' }} color={'green'}>
                    Sign Up
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

                <InputLabel sx={{ color: 'white' }} htmlFor="inputEmail">Email</InputLabel>
                <TextField
                    id='inputEmail'
                    variant='outlined'
                    fullWidth
                    name='email'
                    required
                    value={formData.email}
                    type={'email'}
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

                <Button color='success' type='submit' variant='contained' fullWidth size='large'>Register</Button>

                <Typography variant='body1' sx={{ mt: 2 }}>Already have an account? <Link style={{ textDecoration: 'none', color: 'green', fontWeight: 'bold' }} href={'/auth/login'}>Login</Link></Typography>
            </Box>
        </LoginLayoutComponent>
    )
}
