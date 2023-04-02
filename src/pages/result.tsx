import LayoutComponent from '@/components/LayoutComponent'
import { Box, Container, Slide, Typography, useScrollTrigger } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function ResultPage() {
    const router = useRouter()
    const { session_id } = router.query
    const trigger = useScrollTrigger()
    useEffect(() => {
        if (session_id) {
            setTimeout(() => {
                router.push('/')
            }, 5000);
        }
    }, [session_id])

    return (
        <LayoutComponent>
            <Container maxWidth={'md'}>
                <Slide in={!trigger} >
                    <Box sx={{ borderRadius: 5, border: 1, px: 10, py: 5, borderColor: 'green', height: 'fit-content', width: 'fit-content' }}>
                        <Typography variant='h3' sx={{ color: 'green' }}>Thanks for Purchasing!</Typography>
                        <Typography variant='body1' sx={{ color: 'green' }}>You will be redirected to home page...</Typography>
                    </Box>
                </Slide>
            </Container>
        </LayoutComponent>
    )
}