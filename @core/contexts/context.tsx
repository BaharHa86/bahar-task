import React, {
   
    createContext,
    useContext,
    useEffect,
   
    useState,
} from 'react';

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
    const [theme, setTheme] = useState('');
    const [locale, setLocale] = useState('');
    

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        const storedTheme = localStorage.getItem('theme');
        const storedLocale = localStorage.getItem('locale');
      
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
