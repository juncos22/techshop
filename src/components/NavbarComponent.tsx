import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { InputAdornment, TextField } from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import Link from 'next/link';

export default function NavbarComponent() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <img src={'/favicon.ico'} alt="icon" width={25} style={{ marginRight: 10 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        TechShop
                    </Typography>
                    <TextField
                        id="input-with-icon-textfield"
                        placeholder='Find the best products!'
                        fullWidth
                        sx={{ mx: 3 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchRounded />
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                    />
                    <Button color="inherit">
                        <Link href={'/auth/login'} style={{ textDecoration: 'none' }}>
                            Login
                        </Link>
                    </Button>

                </Toolbar>
            </AppBar>
        </Box>
    );
}