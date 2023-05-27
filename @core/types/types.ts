import { ChangeEvent } from "react";

interface ProfileType{
    name:string;
    setName:(event: ChangeEvent<HTMLInputElement>) => void;
    theme:string;
    setTheme:(event: ChangeEvent<HTMLInputElement>) => void;
    locale:string;
    setLocale:(event: ChangeEvent<HTMLInputElement>) => void; 
}