import React,{ReactNode, useEffect, useState} from 'react'
import Header from '../header'
import SideBar from '../side-bar';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { TFunction } from 'i18next';
import { useStateContext } from '@/@core/contexts/context';
 



interface MainLayoutProps{
    children:ReactNode;
   
}

function MainLayout({children}:MainLayoutProps) {
  const { theme } =
  useStateContext();

  // const [currentTheme , setCurrentTheme] = useState<theme>(lightTheme);
  // const lightTheme = createTheme({
  //   palette: {
  //   mode: 'light',
  //   primary: {
  //   main: '#000',
  //   },
  //   background: {
  //   default: '#F5F5F5',
  //   paper: '#FFF',
  //   },
  //   text: {
  //   primary: '#000',
  //   secondary: '#666666',
  //   },
  //   },
  //   });
    
  //   const darkTheme = createTheme({
  //   palette: {
  //   mode: 'dark',
  //   primary: {
  //   main: '#FFF',
  //   },
  //   background: {
  //   default: '#000',
  //   paper: '#1C1C1C',
  //   },
  //   text: {
  //   primary: '#FFF',
  //   secondary: '#B3B3B3',
  //   },
  //   },
  //   });
    // useEffect(() => {
    //   if(theme === 'dark'){
    //    setCurrentTheme(darkTheme);
    //   } else{
    //     setCurrentTheme(lightTheme);
    //   }
    // } , [theme]);
  return (
    // <ThemeProvider theme={theme}>
    <Box>
        <Header />
        <Box sx={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between'
        }}>
            <SideBar/>
            <main>
                 {children}
            </main>
        </Box>
        </Box>
        // </ThemeProvider>
  )
}

export default MainLayout