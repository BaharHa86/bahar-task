import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useStateContext } from '@/@core/contexts/context';

function ProfilePage() {
    const { name, setName, theme, setTheme, locale, setLocale } =
        useStateContext();

    const nameRef = useRef<HTMLInputElement>(null);
    const themeRef = useRef<HTMLInputElement>(null);
    const localeRef = useRef<HTMLInputElement>(null);

    function saveHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (nameRef.current && themeRef.current && localeRef.current) {
            const newName = nameRef.current.value;
            const newTheme = themeRef.current.value;
            const newLocale = localeRef.current.value;
            if (newName && newTheme && newLocale) {
                setName(newName);
                setTheme(newTheme);
                setLocale(newLocale);

                localStorage.setItem('name', newName);
                localStorage.setItem('theme', newTheme);
                localStorage.setItem('local', newLocale);
            }
            nameRef.current.value = '';
            themeRef.current.value = '';
            localeRef.current.value = '';
        }
       
    }

    return (
        <Box sx={{display:'flex',justifyContent:'center' ,alignItems:'center',width:'80vw', marginTop:10}}>
        <form onSubmit={saveHandler}>
            <Stack spacing={4}>
                <TextField
                    label='Name'
                    defaultValue={''}
                    inputProps={{ ref: nameRef }}
                    sx={{width:'25vw'}}
                />

                <TextField
                    label='theme'
                    select
                    defaultValue={''}
                    inputProps={{ ref: themeRef }}
                >
                    <MenuItem value='light'>Light</MenuItem>
                    <MenuItem value='dark'>Dark</MenuItem>
                </TextField>
                <TextField
                    label='locale'
                    select
                    defaultValue={''}
                    inputProps={{ ref: localeRef }}
                >
                    <MenuItem value='en-US'>English</MenuItem>
                    <MenuItem value='fa-IR'>Persian</MenuItem>
                </TextField>
                <Button variant='contained' type='submit' style={{padding:'12px'}}>
                    Save
                </Button>
            </Stack>
        </form>
        </Box>
    );
}

export default ProfilePage;
