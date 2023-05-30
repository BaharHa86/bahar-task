import { useStateContext } from '@/@core/contexts/context';
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
 
} from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

function SideBar() {
    const { locale } = useStateContext();
    const router = useRouter();
    const { locale: currentLocale } = useStateContext();
    const { t } = useTranslation('common');

    const navItems = [
        { title: t('SideBar.Home'), url: '/' },
        { title: t('SideBar.Todos'), url: '/todos' },
        { title: t('SideBar.Weather'), url: '/weather' },
        { title: t('SideBar.Profile'), url: '/profile' },
    ];

    return (
        <Box
            sx={{
                textAlign: 'center',
                width: '20vw',
                height: '100vh',
                borderTop: 0,
                borderRight: 1,
                borderLeft: 1,
                borderColor: 'lightGrey',
            }}
        >
            <Typography
                variant='h6'
                sx={{
                    my: 2,
                    '@media (max-width: 450px)': {
                        fontSize: '0.8rem',
                    },
                }}
            >
                {t('SideBar.Dashboard')}
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.title} disablePadding>
                        <ListItemButton
                            sx={{
                                textAlign: 'center',
                                width: '80%',
                                '@media (max-width: 450px)': {
                                    fontSize: '0.6rem',
                                },
                            }}
                            onClick={() => {
                                router.push(item.url);
                            }}
                        >
                            <ListItemText
                                primary={item.title}
                                sx={{
                                    '@media (max-width: 450px)': {
                                        fontSize: '0.6rem',
                                    },
                                }}
                            ></ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default SideBar;

