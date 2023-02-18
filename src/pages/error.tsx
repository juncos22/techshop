import { Container, Typography } from '@mui/material'
import React from 'react'

type ErrorProps = {
    message: string
}
export default function ErrorPage({ message }: ErrorProps) {
    return (
        <Container maxWidth={'md'} sx={{ textAlign: 'center' }}>
            <Typography variant='h3' color={'red'}>Error</Typography>
            <Typography variant='body1'>{message}</Typography>
        </Container>
    )
}
