import * as React from 'react';

import { Box, TextField, Autocomplete, Typography } from '@mui/material';
import { cities } from '@/@core/data/data';
import { useState } from 'react';
import WeatherCode from '@/@core/components/weather-code';

// interface CityType {
//     city: string;
//     lat: string;
//     lng: string;
//     country: string;
//     iso2: string;
//     admin_name: string;
//     capital: string;
//     population: string;
//     population_proper: string;
// }

export default function WeatherPage() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState<{
        city:string;
        currentTemperature: string;
        currentWeather: number;
    } | null>(null);

    const handleCityChange = (event: React.SyntheticEvent, value: string) => {
        setCity(value);
        fetchWeatherData(value);
    };

    const fetchWeatherData = async (city: string) => {
        const cityInfo = cities.filter((item) => item.city === city);
        if (cityInfo[0]) {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${cityInfo[0].lat}&longitude=${cityInfo[0].lng}&current_weather=true`
            );
            const data = await response.json();
            const weather = {
                city,
                currentTemperature: data.current_weather.temperature,
                currentWeather: + data.current_weather.weathercode,
            };
            setWeatherData(weather);
        }
    };

    return (
        <Box sx={{display:'flex',flexDirection:'column',gap:5,justifyContent:'center' ,alignItems:'center',width:'80vw', marginTop:10}}>
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
                        label='Choose a country'
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                )}
            />

            {weatherData && (
                 <Box sx={{display:'flex',flexDirection:'column',gap:5,justifyContent:'center' ,alignItems:'center',width:'30vw', padding:10,border:1}}>
                    <Typography variant='h4'>{weatherData.city}</Typography>
                    <Typography variant='h4'>{weatherData.currentTemperature}</Typography>
                     <WeatherCode  code={weatherData.currentWeather}/>
                </Box>
            )}
        </Box>
    );
}

 