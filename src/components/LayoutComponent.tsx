import { SearchRounded } from '@mui/icons-material'
import { AppBar, Box, Button, Container, InputAdornment, TextField, Toolbar, Typography } from '@mui/material'
import React, { ReactElement } from 'react'
import Head from 'next/head';
import CategoryMenuComponent from './CategoryMenu';
import NavbarComponent from './NavbarComponent';

type LayoutProps = {
    children: ReactElement
}
export default function LayoutComponent({ children }: LayoutProps) {

    return (
        <>
            <Head>
                <title>TechShop</title>
            </Head>
            <NavbarComponent />
            <CategoryMenuComponent />
            <Container maxWidth={'md'} sx={{ mt: 5 }}>
                {children}
            </Container>
        </>
    )
}
