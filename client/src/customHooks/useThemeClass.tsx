import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../App";


const useThemeClass = (elementRef: React.RefObject<HTMLDivElement>) =>{
    const { themeValue } = useContext(ThemeContext)!;
    const previousTheme = useRef<string | null>(null);

    useEffect(()=>{
    const currentElement = elementRef.current;
    if (!currentElement) return; 
    
    if(previousTheme.current) {
            elementRef.current?.classList.remove(previousTheme.current);
    }
    elementRef.current!.classList.add(themeValue);
    previousTheme.current = themeValue;

    }, [themeValue, elementRef])

}

export default useThemeClass;
