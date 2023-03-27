import { ProductCart } from '@/models/product.model'
import { Delete } from '@mui/icons-material'
import { Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'

type ProductCartComponentProps = {
    productCart: ProductCart
    onDeleteProduct: (productCart: ProductCart) => void
}

export default function ProductCartComponent({ productCart, onDeleteProduct }: ProductCartComponentProps) {
    return (
        <Card sx={{ width: '100%', mx: 1, my: 1, backgroundColor: 'green' }} variant={'elevation'}>
            <Grid container spacing={1} flex={1}>
                <Grid item xs={10}>
                    <CardContent>
                        <Typography variant='h6'>{productCart.product.name}</Typography>
                        <Typography variant='body1'>{productCart.quantity} units. - ${productCart.subTotal}</Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={2} sx={{ my: 'auto', right: 0 }}>
                    <CardActions sx={{ ml: 'auto' }}>
                        <IconButton onClick={() => onDeleteProduct(productCart)}>
                            <Delete color='error' />
                        </IconButton>
                    </CardActions>
                </Grid>
            </Grid>
        </Card>
    )
}
