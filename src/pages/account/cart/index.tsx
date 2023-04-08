import LayoutComponent from '@/components/LayoutComponent'
import PaymentCheckout from '@/components/PaymentCheckoutComponent'
import ProductCartComponent from '@/components/ProductCartComponent'
import { ProductCart } from '@/models/product.model'
import { useCartStore } from '@/store/productCart'
import { ShoppingCartCheckout } from '@mui/icons-material'
import { Alert, Button, CircularProgress, Container, Fab, Grid, Modal, Slide, Typography, useScrollTrigger } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { CardElement } from "@stripe/react-stripe-js";
import { StripeCardElement } from '@stripe/stripe-js'

export default function AccountCart() {
    const cartStore = useCartStore()
    const deleteProduct = (productCart: ProductCart) => {
        cartStore.deleteFromCart(productCart)
    }
    const session = useSession()

    const trigger = useScrollTrigger()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const router = useRouter()

    useEffect(() => {
        if (session.status === 'unauthenticated') {
            router.push('/auth/login')
        }
    }, [])
    return (
        <LayoutComponent>
            <>
                <Typography variant='h3'>My Cart</Typography>
                <hr />
                {
                    cartStore.productCarts.length === 0 && (
                        <Alert variant='outlined' color='info'>
                            There is not products in your cart.
                        </Alert>
                    )
                }

                <Slide in={!trigger}>
                    <Grid container spacing={1} columns={{ xs: 2, sm: 12, md: 12, lg: 12 }}>
                        {
                            cartStore.productCarts.map((pc, i) => (
                                <Grid item xs={6} key={i}>
                                    <ProductCartComponent productCart={pc} onDeleteProduct={deleteProduct} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Slide>
                {
                    cartStore.productCarts.length !== 0 && (
                        <Fab onClick={handleOpen} variant='extended' color='success' sx={{ position: 'absolute', right: 15, bottom: 15 }}>
                            <ShoppingCartCheckout sx={{ mr: 1 }} />
                            Complete Purchase
                        </Fab>
                    )
                }

                {
                    open && (
                        <Modal
                            open={open}
                            onClose={handleClose}>
                            <PaymentCheckout onCancel={handleClose} />
                        </Modal>
                    )
                }
            </>
        </LayoutComponent>
    )
}

