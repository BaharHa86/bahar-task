import Greeting from '@/@core/components/greeting';
import { useStateContext } from '@/@core/contexts/context';
import { Box, Stack, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    const [currentHour, setCurrentHour] = useState<string>('');
    const [currentMinute, setCurrentMinute] = useState<string>('');
    const { name, locale } = useStateContext();
    const { t } = useTranslation('common');

    useEffect(() => {
        setCurrentHour(new Date().getHours().toString().padStart(2, '0'));
        setCurrentMinute(new Date().getMinutes().toString().padStart(2, '0'));
        const interval = setInterval(() => {
            setCurrentHour(new Date().getHours().toString().padStart(2, '0'));
            setCurrentMinute(
                new Date().getMinutes().toString().padStart(2, '0')
            );
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const user = t('User');
    return (
        <Stack
            spacing={4}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                alignItems: 'center',
                width: '80vw',
                marginTop: 10,
                '@media (max-width: 600px)': {
                    width: '90vw',
                },
            }}
        >
            <Typography
                variant='h3'
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50vw',
                    '@media (max-width: 600px)': {
                        width: '100%',
                        fontSize: '3rem',
                    },
                }}
            >
                {currentHour}:{currentMinute}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50vw',
                    '@media (max-width: 600px)': {
                        width: '100%',
                    },
                }}
            >
                <Greeting hour={+currentHour} />
                <Typography
                    variant='h5'
                    sx={{
                        textAlign: 'center',
                        fontSize: '1.5rem',

                        '@media (max-width: 600px)': {
                            fontSize: '1.2rem',
                        },
                    }}
                >
                    {t('Home.,')}&nbsp;{name ? name : t('Home.User')}.
                </Typography>
            </Box>
        </Stack>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    };
};
