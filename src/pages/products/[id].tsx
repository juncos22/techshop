import LayoutComponent from '@/components/LayoutComponent'
import { api } from '@/lib/axios'
import { Product } from '@/models/product.model'
import { Response } from '@/models/response.model'
import getQuantities from '@/utils/quantity'
import { AddShoppingCartRounded } from '@mui/icons-material'
import { Alert, Button, Card, CardActions, CardContent, Grid, MenuItem, Select, Snackbar, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import ErrorPage from '../error'
import { useCartStore } from '@/store/productCart'

type ProductDetailsProps = {
    res: Response<Product>
}
export default function ProductDetails({ res }: ProductDetailsProps) {
    if (res.status !== 200) return <ErrorPage message={res.error!} />
    const [quantity, setQuantity] = useState(1)
    const cartStore = useCartStore()
    const [open, setOpen] = useState(false)
    const session = useSession()

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
    return (
        <LayoutComponent>
            <Grid container spacing={1}>
                <Grid item xs={8}>
                    <img src={(res.data as Product).image}
                        alt={(res.data as Product).name}
                        width={'100%'}
                        height={'auto'} />
                    <Typography variant='h3' sx={{ color: 'green' }}>{(res.data as Product).name}</Typography>
                    <Typography variant='h5'>Category: {(res.data as Product).category?.name}</Typography>
                    <Typography variant='body2' sx={{ mt: 5, fontStyle: 'italic', color: 'gray', fontSize: 18 }}>{(res.data as Product).description}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Card variant='outlined' sx={{ backgroundColor: 'black', borderColor: 'white', color: 'white' }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 24 }}>
                                Price: ${(res.data as Product).price}
                            </Typography>
                            <Typography sx={{ fontSize: 18 }}>
                                Quantity: {(res.data as Product).quantity} units.
                            </Typography>
                            <CardActions sx={{ flexDirection: 'column', alignItems: 'start' }}>
                                <Typography sx={{ fontSize: 18 }}>Select Quantity</Typography>
                                <Select
                                    sx={{ color: 'white', border: 1, borderColor: 'white' }}
                                    variant='outlined'
                                    fullWidth
                                    name='quantity'
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                >
                                    {
                                        getQuantities((res.data as Product).quantity)
                                            .map(q => (
                                                <MenuItem value={q} key={q}>{q}</MenuItem>
                                            ))
                                    }
                                </Select>
                                <Typography sx={{ fontSize: 20, mt: 2 }}>SubTotal: ${(res.data as Product).price * quantity}</Typography>
                                <Button
                                    onClick={() => handleCart(res.data as Product)}
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
                </Grid>
            </Grid>
        </LayoutComponent>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id } = ctx.query
    const res = await api.get<Response<Product>>(`/products/details/${id as string}`)
    return {
        props: {
            res: res.data
        }
    }
}