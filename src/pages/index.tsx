import CarouselComponent from '@/components/CarouselComponent'
import LayoutComponent from '@/components/LayoutComponent'
import ProductComponent from '@/components/ProductComponent'
import { useProductStore } from '@/store/products'
import { CircularProgress, Container, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import ErrorPage from '@/pages/error'
import CategoryMenuComponent from '@/components/CategoryMenu'

// type ProductProps = {
//   res: Response<Product[]>
// }
export default function HomePage() {
  const productStore = useProductStore()
  useEffect(() => {
    productStore.loadProducts()
  }, [])

  const searchProductByCategory = (categoryName: string) => {
    if (categoryName) productStore.loadProducts(categoryName)
    else productStore.loadProducts()
  }
  const findProductByName = (productName: string) => {
    productStore.loadProducts(undefined, productName)
  }

  if (productStore.error) return <ErrorPage message={productStore.error} />
  return (
    <LayoutComponent onFindProduct={findProductByName}>
      <>
        <CategoryMenuComponent onSearchCategory={searchProductByCategory} />
        <CarouselComponent items={['1.jpg', '2.jpg', '3.jpg']} />
        {
          productStore.loading && (
            <Container sx={{ m: 'auto', textAlign: 'center' }}>
              <CircularProgress size={80} color={'info'} />
            </Container>
          )
        }
        <Grid alignItems={'center'} container spacing={2} columns={{ xs: 2, sm: 12, md: 12, lg: 12 }}>
          {
            productStore.products.map(p => (
              <Grid item xs={6} md={4} lg={3} key={p.id}>
                <ProductComponent product={p} />
              </Grid>
            ))
          }
        </Grid>
      </>
    </LayoutComponent>
  )
}
