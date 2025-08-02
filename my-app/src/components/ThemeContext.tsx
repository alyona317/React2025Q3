import { createContext, useContext, useState, useEffect, type ReactNode} from "react";

type Theme ='light' | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined > (undefined);

export const ThemeProvider = ({children}:{children: ReactNode})=>{
  const [theme, setTheme]=useState<Theme>('light');
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  
  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null; 
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
      setIsThemeLoaded(true);
  }, []);

  useEffect(() => {
    if (!isThemeLoaded) return;
    document.documentElement.setAttribute('data-theme', theme); //
    localStorage.setItem('theme', theme);
  }, [theme, isThemeLoaded]);

  const toggleTheme = ()=>{
    setTheme((prev)=>(
      prev = (prev === "light" ? "dark" : "light")
    ))
  }
  if (!isThemeLoaded) return null;

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = ()=>{
  const context =useContext(ThemeContext)
  if(!context){
     throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}