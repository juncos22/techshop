import CarouselComponent from '@/components/CarouselComponent'
import LayoutComponent from '@/components/LayoutComponent'
import ProductComponent from '@/components/ProductComponent'
import { api } from '@/lib/axios'
import { Product } from '@/models/product.model'
import { Response } from '@/models/response.model'
import { useProductStore } from '@/store/products'
import { CircularProgress, Container, Grid, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import React, { useEffect } from 'react'
import ErrorPage from '@/pages/error'
import CategoryMenuComponent from '@/components/CategoryMenu'

type ProductProps = {
  res: Response<Product[]>
}
export default function HomePage() {
  const productStore = useProductStore()

  useEffect(() => {
    productStore.loadProducts()
  }, [])
  if (productStore.error) return <ErrorPage message={productStore.error} />

  return (
    <LayoutComponent>
      <>
        <CategoryMenuComponent />
        <CarouselComponent items={['1.jpg', '2.jpg', '3.jpg']} />
        {
          productStore.loading && (
            <Container sx={{ m: 'auto', textAlign: 'center' }}>
              <CircularProgress size={80} color={'info'} />
            </Container>
          )
        }
        <Grid alignItems={'center'} container spacing={{ xs: 4, md: 4 }} columns={{ xs: 4, sm: 4, md: 12 }}>
          {
            productStore.products.map(p => (
              <Grid item xs={2} sm={2} md={4} key={p.id}>
                <ProductComponent product={p} />
              </Grid>
            ))
          }
        </Grid>
      </>
    </LayoutComponent>
  )
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     const res = await api.get<Response<Product[]>>('/products')
//     return {
//         props: {
//             res: res.data
//         }
//     }
// }
