import React, { FC } from 'react';
import { Typography } from '@mui/material';
 

interface WeatherCodeProps {
  code: number;
}

function WeatherCode({ code }:WeatherCodeProps){
 
  let description;

  switch (code) {
    case 0:
     
      description = 'Sunny';
      break;
    case 1:
    case 2:
    case 3:
    
      description = 'Clear or Partly Cloudy';
      break;
    case 45:
    case 48:
     
      description = 'Foggy';
      break;
    case 51:
    case 53:
    case 55:
     
      description = 'Rainy';
      break;
    case 56:
    case 57:
    
      description = 'Freezing Rain';
      break;
    case 61:
    case 63:
    case 65:
     
      description = 'Rain';
      break;
    case 66:
    case 67:
      
      description = 'Freezing Rain';
      break;
    case 71:
    case 73:
    case 75:
 
      description = 'Snowy';
      break;
    case 77:
    
      description = 'Snow Particles';
      break;
    case 80:
    case 81:
    case 82:
    
      description = 'Heavy Rain';
      break;
    case 85:
    case 86:
    
      description = 'Heavy Snow';
      break;
    case 95:
     
      description = 'Thunderstorm';
      break;
    case 96:
    case 99:
    
      description = 'Thunderstorm with Hail';
      break;
    default:
      return null;
  }

  return (
    <div>
      
      <Typography variant="h6">
        {description}
      </Typography>
    </div>
  );
};

export default WeatherCode;


 