import LayoutComponent from '@/components/LayoutComponent'
import PaymentCheckout from '@/components/PaymentCheckoutComponent'
import ProductCartComponent from '@/components/ProductCartComponent'
import { ProductCart } from '@/models/product.model'
import { useCartStore } from '@/store/productCart'
import { ShoppingCartCheckout } from '@mui/icons-material'
import { Alert, Fab, Grid, Modal, Slide, Typography, useScrollTrigger } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

export default function AccountCart() {
    const cartStore = useCartStore()
    const deleteProduct = (productCart: ProductCart) => {
        cartStore.deleteFromCart(productCart)
    }
    const session = useSession()

    const trigger = useScrollTrigger()
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const router = useRouter()
    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState("")

    const createPayment = async () => {
        if (session.status === 'authenticated') {
            if (stripe && elements) {
                const result = await stripe.createPaymentMethod({
                    type: "card",
                    card: elements.getElement(CardElement)!,
                    billing_details: {
                        name: session.data.user.name,
                        email: session.data.user.email
                    },
                })
                // console.log(result);
                cartStore.makePurchase(cartStore.cart, result.paymentMethod?.id!)
                setTimeout(() => {
                    if (!cartStore.error) {
                        handleClose()
                        setMessage("Payment succeeded")
                    }
                }, 2000);
            }
        } else {
            router.push('/auth/login')
        }
    }

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
                {
                    message && <Alert sx={{ mt: 2 }} color='success' variant='outlined'>{message}</Alert>
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

                <Modal
                    open={open}
                    onClose={handleClose}>
                    <PaymentCheckout
                        onCancel={handleClose}
                        onComplete={createPayment} />
                </Modal>
            </>
        </LayoutComponent>
    )
}

