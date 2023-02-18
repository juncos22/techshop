import { Paper } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import Carousel from 'react-material-ui-carousel'

type ItemProps = {
    image: string
}
function Item({ image }: ItemProps) {
    return (
        <Paper>
            <Image alt='item' priority src={`/${image}`} width={1200} height={200} />
        </Paper>
    )
}

type CarouselProps = {
    items: string[]
}
export default function CarouselComponent({ items }: CarouselProps) {
    return (
        <Carousel sx={{ mb: 2 }}>
            {
                items.map((item, i) => <Item key={i} image={item} />)
            }
        </Carousel>
    )
}
