import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Container } from '@mui/system';

const categories = [
    {
        name: 'Laptops'
    },
    {
        name: 'PC Gamer'
    },
    {
        name: 'Accessories'
    },
    {
        name: 'Network'
    },
    {
        name: 'Mobile'
    },
    {
        name: 'Printers'
    },
    {
        name: 'Video Cards'
    },
    {
        name: 'Tablets'
    }
]
export default function CategoryMenuComponent() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Container maxWidth={'md'} sx={{mt: 2}}>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                CATEGORIES
            </Button>
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
                    categories.map((c, i) => (
                        <MenuItem onClick={handleClose} key={i}>{c.name}</MenuItem>
                    ))
                }
            </Menu>
        </Container>
    );
}
