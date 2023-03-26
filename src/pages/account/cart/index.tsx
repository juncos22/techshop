import LayoutComponent from '@/components/LayoutComponent'
import ProductCartComponent from '@/components/ProductCartComponent'
import { ProductCart } from '@/models/product.model'
import { useProductStore } from '@/store/products'
import { ShoppingCartCheckout } from '@mui/icons-material'
import { Alert, Container, Fab, Grid, Slide, Typography, useScrollTrigger } from '@mui/material'
import React from 'react'

export default function AccountCart() {
    const productStore = useProductStore()
    const deleteProduct = (productCart: ProductCart) => {
        productStore.deleteFromCart(productCart)
        productStore.loadProducts()
    }
    const trigger = useScrollTrigger()
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
                            productStore.productCarts.map(pc => (
                                <Grid item xs={6}>
                                    <ProductCartComponent productCart={pc} onDeleteProduct={deleteProduct} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Slide>
                {
                    productStore.productCarts.length !== 0 && (
                        <Fab variant='extended' color='success' sx={{ position: 'absolute', right: 15, bottom: 15 }}>
                            <ShoppingCartCheckout sx={{ mr: 1 }} />
                            Complete Purchase
                        </Fab>
                    )
                }
            </>
        </LayoutComponent>
    )
}
