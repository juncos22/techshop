import '@/styles/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app'
import React from 'react';

const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Elements stripe={stripe}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Elements>
  )
}