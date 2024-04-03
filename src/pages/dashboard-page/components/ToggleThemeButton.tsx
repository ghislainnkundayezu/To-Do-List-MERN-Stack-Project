import { FC, useContext } from "react";
import { Icon } from "@iconify/react";
import { ThemeContext } from "../../../App";

export const ToggleThemeButton: FC = () => {
    const {themeValue, toggleTheme} = useContext(ThemeContext)!;
    
    return(
        <button 
            id="toggle-theme-btn"
            onClick={() => {toggleTheme()}}>
           { (themeValue==="light-theme") ? <Icon icon={"heroicons-solid:moon"} /> : <Icon icon={"ph:sun-thin"} /> }
        </button>
    );
}