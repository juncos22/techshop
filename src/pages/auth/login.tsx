import LoginLayoutComponent from '@/components/LoginLayoutComponent'
import { Avatar, Box, TextField, Typography } from '@mui/material'
import React from 'react'

export default function LoginPage() {
    return (
        <LoginLayoutComponent>
            <Box component={'form'} sx={{ backgroundColor: '#CDDC39', borderRadius: 3, m: 'auto', px: 5, py: 3, my: 'auto' }}>

                <Avatar alt="Remy Sharp" src={'/favicon.ico'} sx={{ objectFit: 'cover', width: 80, height: 80, m: 'auto' }} />

                <Typography variant='h3' sx={{ textAlign: 'center' }} color={'#212121'}>
                    Sign In
                </Typography>

                <TextField
                    variant='filled'
                    fullWidth
                    placeholder='Username'
                    type={'text'}
                    size={'medium'}
                    sx={{ my: 2 }} />
                <TextField
                    variant='filled'
                    fullWidth
                    placeholder='Password'
                    type={'password'}
                    sx={{ my: 2 }}
                    size={'medium'} />
            </Box>
        </LoginLayoutComponent>
    )
}
