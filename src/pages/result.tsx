import LayoutComponent from '@/components/LayoutComponent'
import { Box, Container, Slide, Typography, useScrollTrigger } from '@mui/material'
import React from 'react'

export default function ResultPage() {
    const trigger = useScrollTrigger()

    return (
        <LayoutComponent>
            <Container maxWidth={'md'}>
                <Slide in={!trigger} >
                    <Box sx={{ borderRadius: 5, border: 1, px: 10, py: 5, borderColor: 'green', height: 'fit-content', width: 'fit-content' }}>
                        <Typography variant='h3' sx={{ color: 'green' }}>
                            Thanks for Purchasing!
                        </Typography>
                        <Typography variant='body1' sx={{ color: 'green' }}>
                            You can go home
                        </Typography>
                    </Box>
                </Slide>
            </Container>
        </LayoutComponent>
    )
}
