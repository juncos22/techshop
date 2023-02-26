import { SearchRounded } from '@mui/icons-material'
import { AppBar, Box, Button, Container, InputAdornment, TextField, Toolbar, Typography } from '@mui/material'
import React, { ReactElement } from 'react'
import Head from 'next/head';
import CategoryMenuComponent from './CategoryMenu';
import NavbarComponent from './NavbarComponent';

type LayoutProps = {
    children: ReactElement,
    onFindProduct?: (productName: string) => void
}
export default function LayoutComponent({ children, onFindProduct }: LayoutProps) {

    return (
        <>
            <Head>
                <title>TechShop</title>
            </Head>
            <NavbarComponent onFindProduct={onFindProduct!} />
            <Container maxWidth={'lg'} sx={{ mt: 5 }}>
                {children}
            </Container>
        </>
    )
}
