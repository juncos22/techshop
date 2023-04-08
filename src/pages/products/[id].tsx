import LayoutComponent from '@/components/LayoutComponent'
import { Product } from '@/models/product.model'
import getQuantities from '@/utils/quantity'
import { AddShoppingCartRounded } from '@mui/icons-material'
import { Alert, Button, Card, CardActions, CardContent, CircularProgress, Container, Grid, MenuItem, Select, Snackbar, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import ErrorPage from '../error'
import { useCartStore } from '@/store/productCart'
import { useProductStore } from '@/store/products'
import { useRouter } from 'next/router'


export default function ProductDetails() {
    const [quantity, setQuantity] = useState(1)
    const cartStore = useCartStore()
    const [open, setOpen] = useState(false)
    const session = useSession()
    const productStore = useProductStore()
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        productStore.getProductDetail(id as string)
    }, [])


    const handleCart = (product: Product) => {
        if (!cartStore.productCarts.find(pc => pc.product.name === product.name)) {
            cartStore.addToCart({
                product,
                quantity,
                subtotal: product.price * quantity
            }, session.data?.user.name!)
            setOpen(true)
        }
    }
    if (productStore.error) return <ErrorPage message={productStore.error} />
    if (productStore.loading) return (
        <Container maxWidth={'md'} sx={{ m: 'auto', textAlign: 'center' }}>
            <CircularProgress size={80} color='info' />
        </Container>
    )
    return (
        <LayoutComponent>
            <Grid container spacing={1}>
                <Grid item xs={8}>
                    <img src={productStore.productDetail.image}
                        alt={productStore.productDetail.name}
                        width={'100%'}
                        height={'auto'} />
                    <Typography variant='h3' sx={{ color: 'green' }}>
                        {productStore.productDetail.name}
                    </Typography>
                    <Typography variant='h5'>Category: {productStore.productDetail.category?.name}</Typography>
                    <Typography variant='body2' sx={{ mt: 5, fontStyle: 'italic', color: 'gray', fontSize: 18 }}> {productStore.productDetail.description}</Typography>
                </Grid>
                <Grid item xs={4}>
                    {
                        session.status === 'authenticated'
                        && (
                            <Card variant='outlined' sx={{ backgroundColor: 'black', borderColor: 'white', color: 'white' }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 24 }}>
                                        Price: ${productStore.productDetail.price}
                                    </Typography>
                                    <Typography sx={{ fontSize: 18, color: productStore.productDetail.quantity > 0 ? 'white' : 'red' }}>
                                        {
                                            productStore.productDetail.quantity > 0 ? (
                                                `Quantity: ${productStore.productDetail.quantity} units.`
                                            ) : "Out of Stock"
                                        }
                                    </Typography>
                                    <CardActions sx={{ flexDirection: 'column', alignItems: 'start' }}>
                                        <Typography sx={{ fontSize: 18 }}>Select Quantity</Typography>
                                        <Select
                                            sx={{ color: 'white', border: 1, borderColor: 'white' }}
                                            variant='outlined'
                                            fullWidth
                                            disabled={productStore.productDetail.quantity === 0}
                                            name='quantity'
                                            value={quantity}
                                            onChange={(e) => setQuantity(Number(e.target.value))}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                        >
                                            {
                                                getQuantities(productStore.productDetail.quantity)
                                                    .map(q => (
                                                        <MenuItem value={q} key={q}>{q}</MenuItem>
                                                    ))
                                            }
                                        </Select>
                                        <Typography sx={{ fontSize: 20, mt: 2 }}>
                                            SubTotal: ${productStore.productDetail.price * quantity}
                                        </Typography>
                                        <Button
                                            disabled={productStore.productDetail.quantity === 0}
                                            onClick={() => handleCart(productStore.productDetail)}
                                            startIcon={<AddShoppingCartRounded />} sx={{ marginLeft: 'auto', mt: 2 }} variant='outlined' color='success'>
                                            Add to Cart
                                        </Button>
                                    </CardActions>
                                    <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
                                        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: 'auto' }}>
                                            Product Added to Cart!
                                        </Alert>
                                    </Snackbar>
                                </CardContent>
                            </Card>
                        )
                    }
                </Grid>
            </Grid>
        </LayoutComponent >
    )
}