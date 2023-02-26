import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Product } from '@/models/product.model';
import Link from 'next/link';

type ProductProps = {
    product: Product
}
export default function ProductComponent({ product: { id, name, image, category, description, price } }: ProductProps) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={image}
                title={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name} - {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ${price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">
                    <Link href={`/products/${id}`} style={{ textDecoration: 'none' }}>
                        Details
                    </Link>
                </Button>
            </CardActions>
        </Card>
    );
}