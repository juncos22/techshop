import ProfileLayoutComponent from '@/components/ProfileLayoutComponent'
import { api } from '@/lib/axios'
import { Cart } from '@/models/product.model'
import { Response } from '@/models/response.model'
import { User } from '@/models/user.model'
import { useAccountStore } from '@/store/account'
import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, CircularProgress, Container, Grid, Link, TextField, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import ErrorPage from '../error'
import ProductCartComponent from '@/components/ProductCartComponent'
import ProductComponent from '@/components/ProductComponent'
import PurchasedProductComponent from '@/components/PurchasedProductComponent'
import { ExpandMore } from '@mui/icons-material'

export default function ProfileAccount() {
    const accountStore = useAccountStore()
    const [changedUser, setChangedUser] = useState<User>({ id: '', name: '', email: '', password: '' })
    const [editMode, setEditMode] = useState(false)
    const session = useSession()

    useEffect(() => {
        if (session.data && session.status === 'authenticated') {
            accountStore.getProfile(session.data.user.name!)
            if (accountStore.user) {
                setChangedUser({ id: accountStore.user.id, name: accountStore.user.name, email: accountStore.user.email, password: accountStore.user.password })
            }
        }
    }, [accountStore.user.id])


    const onSaveChanges = () => {
        // console.log(changedUser);
        accountStore.updateProfile(changedUser)
        setEditMode(false)
    }
    const handleForm = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setChangedUser({ ...changedUser, [e.target.name]: e.target.value })
    }

    if (accountStore.error) return <ErrorPage message={accountStore.error} />
    return (
        <ProfileLayoutComponent section='Account'>
            <Typography variant='h3'>Account Info</Typography>
            {
                accountStore.loading ? (
                    <Container maxWidth={'sm'} sx={{ m: 'auto', textAlign: 'center' }}>
                        <CircularProgress size={100} color={'info'} />
                    </Container>
                ) : (
                    <>
                        <Grid container spacing={{ xs: 1, sm: 2, md: 2, lg: 2 }} columns={{ xs: 2, sm: 12, md: 12, lg: 12 }}>
                            <Grid item xs={6}>
                                <TextField type={'text'} fullWidth variant='outlined' color='success' label='Username' sx={{ my: 2, input: { color: 'white', border: 1, borderRadius: 1, borderColor: 'green', fontSize: 18 }, label: { color: 'green' }, borderRadius: 1, borderColor: 'white' }}
                                    value={editMode ? changedUser.name : accountStore.user.name}
                                    name='name'
                                    onChange={(e) => editMode ? handleForm(e) : null} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type={'email'} fullWidth variant='outlined' color='success' label='Email' sx={{
                                    my: 2, input: { color: 'white', border: 1, borderRadius: 1, borderColor: 'green', fontSize: 18, },
                                    label: { color: 'green' }, borderRadius: 1, borderColor: 'white'
                                }}
                                    value={editMode ? changedUser.email : accountStore.user.email}
                                    name='email'
                                    onChange={(e) => editMode ? handleForm(e) : null} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant='outlined' color='success' label='Password' type={'password'} sx={{
                                    my: 2, input: { color: 'white', border: 1, borderRadius: 1, borderColor: 'green', fontSize: 18, },
                                    label: { color: 'green' }, borderRadius: 1, borderColor: 'white'
                                }}
                                    value={editMode ? changedUser.password : accountStore.user.password}
                                    name='password'
                                    onChange={(e) => editMode ? handleForm(e) : null} />
                            </Grid>

                            <Grid item xs={6}>
                                <Button sx={{ mb: 1 }} fullWidth size='large' variant='contained' color='success' onClick={() => editMode ? onSaveChanges() : setEditMode(true)}>
                                    {
                                        editMode ? "Save Changes" : "Edit Profile"
                                    }
                                </Button>
                                <Link href={'/'}>
                                    <Button fullWidth size='large' variant='contained' color='info'>Back to home</Button>
                                </Link>
                            </Grid>
                            <Grid item xs={6}></Grid>
                        </Grid>
                        <hr />
                        <Typography variant='h4'>My Purchases</Typography>
                        <Container maxWidth={'md'}>
                            {
                                accountStore.user.carts
                                && accountStore.user.carts.map((c, i) => (
                                    <Accordion sx={{ mt: 2, color: 'green', border: 1 }} key={i} TransitionProps={{ unmountOnExit: true }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMore />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>TOTAL PURCHASED: ${c.total}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {
                                                c.productCarts.map((pc, i) => (
                                                    <PurchasedProductComponent
                                                        key={i}
                                                        productCart={pc} />
                                                ))
                                            }
                                        </AccordionDetails>
                                    </Accordion>
                                ))
                            }
                            {
                                accountStore.user.carts?.length === 0 && (
                                    <Alert sx={{ mt: 3 }} variant='outlined' color='info'>
                                        You are not purchased any products
                                    </Alert>
                                )
                            }
                        </Container>
                    </>
                )
            }
        </ProfileLayoutComponent>
    )
}