import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { CloseRounded, SearchRounded } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';

type NavbarComponentProps = {
    onFindProduct: (productName: string) => void
}
export default function NavbarComponent({ onFindProduct }: NavbarComponentProps) {
    const [productName, setProductName] = React.useState("")
    const router = useRouter()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'green' }}>
                <Toolbar>
                    <img src={'/favicon.ico'} alt="icon" width={25} style={{ marginRight: 10 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link href={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                            TechShop
                        </Link>
                    </Typography>
                    <TextField
                        id="input-with-icon-textfield"
                        placeholder='Find the best products!'
                        fullWidth
                        sx={{ mx: 3 }}
                        name="productName"
                        disabled={router.pathname !== '/'}
                        value={productName}
                        onChange={(e) => {
                            setProductName(e.target.value)
                        }}
                        onKeyDown={(e) => {
                            if (e.code === 'Enter' && productName.length) {
                                onFindProduct(productName)
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {
                                        !productName && <SearchRounded />
                                    }
                                    {
                                        productName && (
                                            <IconButton onClick={() => setProductName("")}>
                                                <CloseRounded />
                                            </IconButton>
                                        )
                                    }
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                    />
                    <Button color="inherit">
                        <Link href={'/auth/login'} style={{ color: 'black', textDecoration: 'none' }}>
                            Login
                        </Link>
                    </Button>

                </Toolbar>
            </AppBar>
        </Box>
    );
}