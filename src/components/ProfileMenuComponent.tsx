import { useAccountStore } from '@/store/account';
import { Container, Button, Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import React from 'react'

const menuItems = [
    {
        name: "Profile",
        url: "/account",
    },
    {
        name: "My Cart",
        url: "/account/cart",
    },
    {
        name: "Logout",
    }
]
export default function ProfileMenuComponent() {
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
        <Container maxWidth={'sm'} sx={{ ml: 'auto' }}>
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
                        if (c.url) return <MenuItem key={i} href={c.url}>{c.name}</MenuItem>
                        return <MenuItem key={i} onClick={() => accountStore.signOut()}>{c.name}</MenuItem>
                    })
                }
            </Menu>
        </Container>
    );
}
