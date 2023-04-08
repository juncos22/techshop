import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgress, Alert, Container } from '@mui/material';
import { useCartStore } from '@/store/productCart';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentRounded } from '@mui/icons-material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#f9f9f9',
    color: 'black',
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


type PaymentCheckoutProps = {
    onCancel: () => void
    onComplete: () => void
}
export default function PaymentCheckout({ onCancel, onComplete }: PaymentCheckoutProps) {
    const cartStore = useCartStore()
    const session = useSession()
    const router = useRouter()

    const [formComplete, setFormComplete] = React.useState(false)



    return (
        <Box sx={style}>
            <>
                <PaymentDetails />
                <CardElement onChange={(e) => setFormComplete((_) => e.complete)} options={cardStyle} id='card-element' />
                {
                    cartStore.loading ? (
                        <Container maxWidth={'sm'} sx={{ textAlign: 'center' }}>
                            <CircularProgress size={30} color='info' placeholder='Finishing payment' />
                        </Container>
                    ) : (
                        <Container maxWidth={'sm'} sx={{ ml: 'auto', mt: 2, textAlign: 'center' }}>
                            <Button onClick={onCancel} disabled={cartStore.loading} variant='outlined' sx={{ mr: 1 }}>
                                Cancel
                            </Button>
                            <Button variant='contained' disabled={cartStore.loading || !formComplete} sx={{ ml: 1 }} startIcon={<PaymentRounded />} onClick={onComplete}>
                                Finish Checkout
                            </Button>
                        </Container>
                    )
                }
                {
                    cartStore.error && <Alert color='error'>{cartStore.error}</Alert>
                }
            </>
        </Box>
    );
}

const cardStyle = {
    style: {
        base: {
            color: "black",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            "::placeholder": {
                color: "green",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    }
}