import MainLayout from '@/@core/components/main-layout'
import ContextProvider, { useStateContext } from '@/@core/contexts/context'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {appWithTranslation} from 'next-i18next';
 
 
 
 
 
function App({ Component, pageProps }: AppProps) {
 
 
  return (
    <ContextProvider>
    <MainLayout >
      <Component {...pageProps} />
  </MainLayout>
  </ContextProvider>
  )
  
}
export default appWithTranslation(App);




 
