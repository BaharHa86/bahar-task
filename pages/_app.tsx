import MainLayout from '@/@core/components/main-layout';
import ContextProvider, { useStateContext } from '@/@core/contexts/context';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        const savedLocale = Cookies.get('locale');
        const currentLocale = savedLocale ? savedLocale : '';
        router.locale = currentLocale;
    }, []);
    return (
        <ContextProvider>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </ContextProvider>
    );
}
export default appWithTranslation(App);
