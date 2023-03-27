import { Container } from '@mui/material'
import React, { ReactElement } from 'react'
import Head from 'next/head';
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
