import React, { ReactNode, useEffect, useState } from 'react';
import Header from '../header';
import SideBar from '../side-bar';
import {
    Box,
    PaletteMode,
    Theme,
    ThemeProvider,
    createTheme,
    Direction,
} from '@mui/material';
import { useStateContext } from '@/@core/contexts/context';
import { useRouter } from 'next/router';

interface MainLayoutProps {
    children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
    const { theme, locale } = useStateContext();

    const router = useRouter();

    const defaultTheme = createTheme();
    const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);
    const [currentMode, setCurrentMode] = useState<PaletteMode>('light');
    const [currentDirection, setCurrentDirection] = useState<Direction>('ltr');
    useEffect(() => {
        setCurrentMode(theme === 'dark' ? 'dark' : 'light');
        setCurrentDirection(locale === 'fa' ? 'rtl' : 'ltr');
    }, [theme,locale]);
    
    
    
    
    useEffect(() => {
      
        const newTheme = createTheme({
            direction: currentDirection,
            palette: {
                mode: currentMode,
            },
        });
        setCurrentTheme(newTheme);
    }, [ currentDirection, currentMode]);



    
 
   
    return (
        <ThemeProvider theme={currentTheme}>
            <Box sx={{ width: '100%', bgcolor: 'background.paper', }} dir={currentDirection}
              
            >
                <Header />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100vw',
                    }}
                >
                    <SideBar />
                    <main
                        style={{
                            width: '80vw',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'self-start',
                        }}
                    >
                        {children}
                    </main>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default MainLayout;
