import Head from 'next/head'
import React from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>VALET</title>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp