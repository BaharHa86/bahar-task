 
 
import Greeting from '@/@core/components/greeting';
import { useStateContext } from '@/@core/contexts/context';
import { Box, Stack, Typography } from '@mui/material'
 
import { useEffect, useState } from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';

 

 

 

export default function Home() {
 
 
  const [currentHour, setCurrentHour] = useState<number>(0);
  const [currentMinute, setCurrentMinute] = useState<string>('');
  const { name } =
  useStateContext();
  const { t } = useTranslation('home');
  useEffect(() => {

    setCurrentHour(new Date().getHours());
    setCurrentMinute(new Date().getMinutes().toString().padStart(2, '0'));
    const interval = setInterval(() => {
    
      setCurrentHour(new Date().getHours());
      setCurrentMinute(new Date().getMinutes().toString().padStart(2, '0'));
 
       
    
      
    }, 60000);

    return () => clearInterval(interval);
  
 
  
  }, []);

 const user = t('User');
  return (
    
    <Stack  spacing={4} sx={{display:'flex' , flexDirection:'column',gap:5, alignItems:'center', width:'80vw',marginTop:10}}>
      <Typography variant="h3" sx={{display:'flex',justifyContent:'center' ,alignItems:'center',width:'50vw'}}>{currentHour}:{currentMinute}</Typography>
      <Box sx={{display:'flex',justifyContent:'center' ,alignItems:'center',width:'50vw'}}>
      <Greeting hour={currentHour} t={t}/> 
     <Typography variant="h5">,&nbsp;{name ? name : user}.</Typography>
     </Box>
    </Stack>
  
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['home']))
    }
  };
}



 
 