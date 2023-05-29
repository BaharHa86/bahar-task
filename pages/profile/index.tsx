import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useStateContext } from '@/@core/contexts/context';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

function ProfilePage() {
    const { name, setName, theme, setTheme, locale, setLocale } =
        useStateContext();
    const router = useRouter();
    const nameRef = useRef<HTMLInputElement>(null);
    const themeRef = useRef<HTMLInputElement>(null);
    const localeRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation('common');

    function saveHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (nameRef.current && themeRef.current && localeRef.current) {
            const newName = nameRef.current.value;
            const newTheme = themeRef.current.value;
            const newLocale = localeRef.current.value;
            if (newName && newTheme && newLocale) {
                setName(newName);
                setTheme(newTheme);
                setLocale(newLocale);

                Cookies.set('name', newName);
                Cookies.set('theme', newTheme);
                Cookies.set('locale', newLocale);
                router.push(router.pathname, router.asPath, {
                    locale: newLocale,
                });
            }
            nameRef.current.value = '';
            themeRef.current.value = '';
            localeRef.current.value = '';
        }
    }

    return (
        <form
            onSubmit={saveHandler}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '80%',
                marginTop: '100px',
            }}
        >
            <Stack
                spacing={4}
                sx={{
                    width: '100%',
                    maxWidth: '600px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TextField
                    label={t('Profile.Name')}
                    defaultValue={''}
                    inputProps={{ ref: nameRef }}
                    sx={{ width: '100%' }}
                />

                <TextField
                    label={t('Profile.theme')}
                    select
                    defaultValue={''}
                    inputProps={{ ref: themeRef }}
                    sx={{ width: '100%' }}
                >
                    <MenuItem value='light'>{t('Profile.Light')}</MenuItem>
                    <MenuItem value='dark'>{t('Profile.Dark')}</MenuItem>
                </TextField>
                <TextField
                    label={t('Profile.locale')}
                    select
                    defaultValue={''}
                    inputProps={{ ref: localeRef }}
                    sx={{ width: '100%' }}
                >
                    <MenuItem value='en'>{t('Profile.English')}</MenuItem>
                    <MenuItem value='fa'>{t('Profile.Persian')}</MenuItem>
                </TextField>
                <Button
                    variant='contained'
                    type='submit'
                    sx={{ width: '100%', padding: '12px' }}
                >
                    {t('Profile.Save')}
                </Button>
            </Stack>
        </form>
    );
}

export default ProfilePage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    };
};
