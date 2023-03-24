import ProfileLayoutComponent from '@/components/ProfileLayoutComponent'
import { api } from '@/lib/axios'
import { Cart } from '@/models/product.model'
import { Response } from '@/models/response.model'
import ErrorPage from '@/pages/error'
import { ArrowBack } from '@mui/icons-material'
import { Alert, Container, IconButton, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

type ProfilePurchasesProps = {
    res: Response<Cart>
}
export default function ProfilePurchases({ res }: ProfilePurchasesProps) {
    if (res.status !== 200 && res.status !== 404) return <ErrorPage message={'Hubo un error'} />

    return (
        <ProfileLayoutComponent section='My Cart'>
            <Typography variant='h4'>
                <Link href={'/'}>
                    <IconButton>
                        <ArrowBack color='info' />
                    </IconButton>
                </Link>
                My Purchases
            </Typography>
            <hr />
            <Container maxWidth={'md'}>
                {
                    res.data && (res.data as Cart).productCarts?.map(pc => (
                        <Typography variant='body1'>{pc.product.name} - {pc.quantity} units. ${pc.subTotal}</Typography>
                    ))
                }
                {
                    res.status === 404 && <Alert variant='outlined' color='info'>
                        You are not purchased any products
                    </Alert>
                }
            </Container>
        </ProfileLayoutComponent>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx)
    console.log(session);

    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }
    const res = await api.get<Response<Cart>>(`/purchases/${session.user.name}`)
    console.log(res.data);

    return {
        props: {
            res: res.data
        }
    }
}