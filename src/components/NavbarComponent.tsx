import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Avatar, Container, IconButton, InputAdornment, TextField } from '@mui/material';
import { CloseRounded, SearchRounded } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useAccountStore } from '@/store/account';
import ProfileMenuComponent from './ProfileMenuComponent';
import { useProductStore } from '@/store/products';

type NavbarComponentProps = {
    onFindProduct: (productName: string) => void
}
export default function NavbarComponent({ onFindProduct }: NavbarComponentProps) {
    const [productName, setProductName] = React.useState("")
    const router = useRouter()
    const session = useSession()
    const productStore = useProductStore()

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
                        sx={{ mx: 1 }}
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
                                            <IconButton onClick={() => {
                                                setProductName("")
                                                productStore.loadProducts()
                                            }}>
                                                <CloseRounded />
                                            </IconButton>
                                        )
                                    }
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                    />
                    {
                        !session.data && (
                            <Button color="inherit">
                                <Link href={'/auth/login'} style={{ color: 'black', textDecoration: 'none' }}>
                                    Login
                                </Link>
                            </Button>
                        )
                    }
                    {
                        session.data && (
                            <Container maxWidth={'xs'} sx={{ textAlign: 'end' }} >
                                <ProfileMenuComponent />
                            </Container>
                        )
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}