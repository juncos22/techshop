import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgress, Alert, Container } from '@mui/material';
import { useCartStore } from '@/store/productCart';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#f9f9f9',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function PaymentDetails() {
    const cartStore = useCartStore()

    return (
        <React.Fragment>
            <Typography variant='h5' sx={{ color: 'black' }}>Payment Details</Typography>
            <hr />
            {
                cartStore.cart.productCarts.map((pc, i) => (
                    <Typography key={i} sx={{ color: 'black' }} variant='h6'>{pc.product.name} - ${pc.subtotal}</Typography>
                ))
            }
            {
                <Typography variant='h6' sx={{ color: 'black' }}>Total: ${cartStore.cart.total}</Typography>
            }
        </React.Fragment>
    )
}


export default function PaymentCheckout() {
    const cartStore = useCartStore()

    const finishCheckOut = async () => {
        // console.log(cartStore.cart);
        cartStore.makePurchase(cartStore.cart)
    }

    return (
        <Box sx={style}>
            <React.Fragment>
                <PaymentDetails />
                {
                    cartStore.error && <Alert color='error'>{cartStore.error}</Alert>
                }
                {
                    cartStore.loading ? (
                        <CircularProgress size={30} color='info' />
                    ) : (
                        <Container maxWidth={'sm'} sx={{ ml: 'auto', textAlign: 'end' }}>
                            <Button onClick={finishCheckOut}>
                                Finish Checkout
                            </Button>
                        </Container>
                    )
                }
            </React.Fragment>
        </Box>
    );
}