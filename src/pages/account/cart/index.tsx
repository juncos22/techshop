import LayoutComponent from '@/components/LayoutComponent'
import PaymentCheckout from '@/components/PaymentCheckoutComponent'
import ProductCartComponent from '@/components/ProductCartComponent'
import { ProductCart } from '@/models/product.model'
import { useProductStore } from '@/store/products'
import { ShoppingCartCheckout } from '@mui/icons-material'
import { Alert, Fab, Grid, Modal, Slide, Typography, useScrollTrigger } from '@mui/material'
import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next/types'
import React from 'react'

type AccountCartProps = {
    username: string
}
export default function AccountCart({ username }: AccountCartProps) {
    const productStore = useProductStore()
    const deleteProduct = (productCart: ProductCart) => {
        productStore.deleteFromCart(productCart)
        productStore.loadProducts()
    }
    const trigger = useScrollTrigger()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    return (
        <LayoutComponent>
            <>
                <Typography variant='h3'>My Cart</Typography>
                <hr />
                {
                    productStore.productCarts.length === 0 && (
                        <Alert variant='outlined' color='info'>
                            There is not products in your cart.
                        </Alert>
                    )
                }
                <Slide in={!trigger}>
                    <Grid container spacing={1} columns={{ xs: 2, sm: 12, md: 12, lg: 12 }}>
                        {
                            productStore.productCarts.map((pc, i) => (
                                <Grid item xs={6} key={i}>
                                    <ProductCartComponent productCart={pc} onDeleteProduct={deleteProduct} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Slide>
                {
                    productStore.productCarts.length !== 0 && (
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

                            <PaymentCheckout username={username} />
                        </Modal>
                    )
                }
            </>
        </LayoutComponent>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx)
    if (!session) return {
        redirect: {
            destination: '/auth/login',
            permanent: false
        }
    }
    return {
        props: {
            username: session.user.name
        }
    }
}
