import { ProductCart } from '@/models/product.model'
import { Grid, Typography } from '@mui/material'
import React from 'react'

type PurchasedProductComponentProps = {
    productCart: ProductCart
}
export default function PurchasedProductComponent({ productCart }: PurchasedProductComponentProps) {
    return (
        <Grid container spacing={2} sx={{ mx: 'auto', my: 2, border: 1, height: 'fit-content', borderColor: 'green', borderRadius: 2, width: '95%' }}>
            <Grid item xs={6}>
                <Typography variant='h5' sx={{ fontSize: 18, color: 'green' }}>{productCart.product.name}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant='h6' sx={{ color: 'green' }}>{productCart.quantity} units.</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant='h6' sx={{ color: 'green' }}>${productCart.subtotal}</Typography>
            </Grid>
        </Grid>
    )
}
