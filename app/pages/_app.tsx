import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import Layout from '../components/layout';
import WalletProvider from "../components/walletadaptor"

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(()=> {
    import('bootstrap/dist/js/bootstrap');
  }, [])

  return (
    <>
    <WalletProvider>
    <Component {...pageProps} />
    </WalletProvider>
    </>
  )
 
  
}

export default MyApp
