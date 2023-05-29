import * as React from 'react';

import { Box, TextField, Autocomplete, Typography } from '@mui/material';
import { cities } from '@/@core/data/data';
import { useState } from 'react';
import WeatherCode from '@/@core/components/weather-code';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

 

export default function WeatherPage() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState<{
        city: string;
        currentTemperature: string;
        currentWeather: number;
    } | null>(null);
    const { t } = useTranslation('common');
    const handleCityChange = (event: React.SyntheticEvent, value: string) => {
        setCity(value);
        fetchWeatherData(value);
    };

    const fetchWeatherData = async (city: string) => {
        const cityInfo = cities.filter((item) => item.city === city);
        if (cityInfo[0]) {
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${cityInfo[0].lat}&longitude=${cityInfo[0].lng}&current_weather=true`
                );

                if (!response.ok) {
                    throw new Error('something went wrong');
                }
                const data = await response.json();
                const weather = {
                    city,
                    currentTemperature: data.current_weather.temperature,
                    currentWeather: +data.current_weather.weathercode,
                };
                setWeatherData(weather);
            } catch (error) {
                console.error('Error fetching weather data: ', error);
            }
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                justifyContent: 'center',
                alignItems: 'center',
                width: '80vw',
                marginTop: 10,
            }}
        >
            <Autocomplete
                id='country-select-demo'
                sx={{ width: 300 }}
                options={cities}
                onInputChange={handleCityChange}
                autoHighlight
                getOptionLabel={(option) => option.city}
                renderOption={(props, option) => (
                    <Box
                        component='li'
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                        {...props}
                    >
                        {option.city}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={t('Weather.Enter city')}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password',
                        }}
                    />
                )}
            />

            {weatherData && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '30vw',
                        padding: 10,
                        border: 1,
                    }}
                >
                    <Typography
                        variant='h4'
                        sx={{
                            '@media (max-width: 400px)': {
                                fontSize: '1rem',
                            },
                        }}
                    >
                        {weatherData.city}
                    </Typography>
                    <Typography
                        variant='h4'
                        sx={{
                            '@media (max-width: 400px)': {
                                fontSize: '.6rem',
                            },
                        }}
                    >
                        {weatherData.currentTemperature}
                    </Typography>
                    <WeatherCode code={weatherData.currentWeather} />
                </Box>
            )}
        </Box>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    };
};
