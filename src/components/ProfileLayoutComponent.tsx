import { Container } from '@mui/material'
import Head from 'next/head'
import React from 'react'

type ProfileLayoutProps = {
    section: string
    children: React.ReactElement | React.ReactElement[]
}

export default function ProfileLayoutComponent({ section, children }: ProfileLayoutProps) {
    return (
        <>
            <Head>
                <title>Profile - {section}</title>
            </Head>
            <Container maxWidth={'md'} sx={{ m: 'auto', textAlign: 'start' }}>
                {children}
            </Container>
        </>
    )
}
