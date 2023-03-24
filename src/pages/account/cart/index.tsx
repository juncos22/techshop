import ProfileLayoutComponent from '@/components/ProfileLayoutComponent'
import { Typography } from '@mui/material'
import React from 'react'

export default function ProfileCart() {
    return (
        <ProfileLayoutComponent section='My Cart'>
            <Typography variant='h4'>My Cart</Typography>
        </ProfileLayoutComponent>
    )
}
