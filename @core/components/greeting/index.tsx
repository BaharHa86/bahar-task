import React from 'react';
import { Typography } from '@mui/material';
import { TFunction } from 'i18next';
 

interface GreetingProps {
    hour: number;
    t: TFunction<"common", undefined, "common">;
}

function Greeting({ hour,t}: GreetingProps) {
   
    let greetingMsg: string;

    if (hour >= 5 && hour < 12) {
        greetingMsg = t('Good morning');
    } else if (hour >= 12 && hour < 17) {
        greetingMsg =t('Good afternoon');
    } else {
        greetingMsg = t('Good night');
    }

    return <Typography variant='h5'>{greetingMsg}</Typography>;
}

export default Greeting;
