import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface StateContextType {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;

    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    locale: string;
    setLocale: React.Dispatch<React.SetStateAction<string>>;
}

const initialState = {
    name: '',
    theme: '',
    locale: '',
    setName: () => {},
    setTheme: () => {},
    setLocale: () => {},
};

const StateContext = createContext<StateContextType>(initialState);

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [name, setName] = useState('');
    const [theme, setTheme] = useState('light');
    const [locale, setLocale] = useState('en');
    const router = useRouter();

    useEffect(() => {
        const storedName = Cookies.get('name');
        const storedTheme = Cookies.get('theme');
        const storedLocale = Cookies.get('locale');
        router.push(router.pathname, router.asPath, { locale: storedLocale });
        if (storedName) {
            setName(storedName);
        }

        if (storedTheme) {
            setTheme(storedTheme);
        }

        if (storedLocale) {
            setLocale(storedLocale);
        }
    }, []);

    return (
        <StateContext.Provider
            value={{
                name,
                setName,
                theme,
                setTheme,
                locale,
                setLocale,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export default ContextProvider;

export const useStateContext = () =>
    useContext(StateContext) as StateContextType;
