import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';

function Header() {
    const { t } = useTranslation();
    return (
        <Box sx={{ width: '100%' }}>
            <AppBar position='static' sx={{ width: '100%' }}>
                <Toolbar sx={{ width: '100%' }}>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {t('Header.AppBar')}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
