import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from '@mui/material';
import { TFunction } from 'i18next';
import React from 'react';
 

function SideBar() {
    const navItems = [{title:'Home',url:'/'},{title:'Todos',
url:'/todos'}, {title:'Weather',url:'/weather'}, {title:'Profile', url:'/profile'}];
    return (
        <Box sx={{ textAlign: 'center', width:'20vw' , height:'100vh', borderTop:0, borderRight: 1 ,borderColor: 'lightGrey' }}>
            <Typography variant='h6' sx={{ my: 2 }}>
                Dashboard
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.title} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} href={item.url}>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default SideBar;
