import ProfileLayoutComponent from '@/components/ProfileLayoutComponent'
import { User } from '@/models/user.model'
import { useAccountStore } from '@/store/account'
import { Alert, Button, CircularProgress, Container, Grid, Link, TextField, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

type ProfileProps = {
    username: string
}
export default function ProfileAccount({ username }: ProfileProps) {
    const accountStore = useAccountStore()
    const [changedUser, setChangedUser] = useState<User>({ id: '', name: '', email: '', password: '' })
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        accountStore.getProfile(username)
        if (accountStore.user) {
            setChangedUser({ id: accountStore.user.id, name: accountStore.user.name, email: accountStore.user.email, password: accountStore.user.password })
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

    return (
        <ProfileLayoutComponent section='Account'>
            <Typography variant='h3'>Profile Account</Typography>
            {
                accountStore.loading ? (
                    <Container maxWidth={'sm'} sx={{ m: 'auto', textAlign: 'center' }}>
                        <CircularProgress size={100} color={'info'} />
                    </Container>
                ) : (
                    <>
                        {
                            accountStore.error && (
                                <Alert variant='outlined' color='error'>{accountStore.error}</Alert>
                            )
                        }
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
                                <Button fullWidth size='large' variant='contained' color='success' sx={{ my: 3 }} onClick={() => editMode ? onSaveChanges() : setEditMode(true)}>
                                    {
                                        editMode ? "Save Changes" : "Edit Profile"
                                    }
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Link href={'/'}>
                                    <Button fullWidth size='large' variant='contained' color='info'>Back to home</Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </>
                )
            }
        </ProfileLayoutComponent>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx)
    if (!session) return {
        redirect: {
            destination: '/auth/login',
            permanent: false
        }
    }

    return {
        props: {
            username: session.user?.name!
        }
    }
}