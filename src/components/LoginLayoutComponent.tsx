import { TextField } from '@mui/material'
import { Box, Container } from '@mui/system'
import Head from 'next/head'
import React from 'react'

type LoginProps = {
    children: React.ReactElement
}
export default function LoginLayoutComponent({ children }: LoginProps) {
    return (
        <>
            <Head>
                <title>TechShop - Login</title>
            </Head>
            <Container maxWidth={'sm'}>
                {children}
            </Container>
        </>
    )
}
