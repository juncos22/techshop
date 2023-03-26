import { useAccountStore } from '@/store/account';
import { Container, Button, Menu, MenuItem, IconButton, Avatar, Grid, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'

const menuItems = [
    {
        name: "Profile",
        url: "/account",
    },
    {
        name: "Logout",
    }
]
type ProfileMenuComponentProps = {
    session: Session
}
export default function ProfileMenuComponent({ session }: ProfileMenuComponentProps) {
    const accountStore = useAccountStore()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <Grid container spacing={2} sx={{ ml: 'auto' }}>
            <Grid item xs={8}>
                <Typography variant='subtitle1' sx={{ my: 2, ml: 'auto', width: 'fit-content' }} color={'inherit'}>Bienvenido/a <strong>{session?.user.name}</strong></Typography>
            </Grid>
            <Grid item xs={3}>
                <IconButton id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    color={'success'}>

                    <Avatar variant='circular' />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {
                        menuItems.map((c, i) => {
                            if (c.url) return (
                                <MenuItem key={i}>
                                    <Link style={{ textDecoration: 'none', color: 'inherit' }} href={c.url!}>
                                        {c.name}
                                    </Link>
                                </MenuItem>
                            )

                            return <MenuItem key={i} onClick={() => accountStore.signOut()}>{c.name}</MenuItem>
                        })
                    }
                </Menu>
            </Grid>
        </Grid>
    );
}
