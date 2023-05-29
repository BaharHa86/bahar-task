import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

interface GreetingProps {
    hour: number;
}

function Greeting({ hour }: GreetingProps) {
    const { t } = useTranslation();

    let greetingMsg: string;

    if (hour >= 5 && hour < 12) {
        greetingMsg = t('Home.Good morning');
    } else if (hour >= 12 && hour < 17) {
        greetingMsg = t('Home.Good afternoon');
    } else {
        greetingMsg = t('Home.Good night');
    }

    return (
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
            {greetingMsg}
        </Typography>
    );
}

export default Greeting;
