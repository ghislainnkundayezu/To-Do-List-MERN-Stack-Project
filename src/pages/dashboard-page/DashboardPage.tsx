import { FC, useContext, useEffect, useRef } from 'react'
import { SearchBar } from './components/SearchBar'
import { ActivityPageLink } from './components/ActivityPageLink'
import { ToggleThemeButton } from './components/ToggleThemeButton'
import { ThemeContext } from '../../App'


export const DashboardPage: FC = () => {
    const {themeValue} = useContext(ThemeContext)!;
    const page = useRef<HTMLDivElement>(null);
    const previousTheme = useRef<string | null>(null);

    useEffect(() => {
        if (previousTheme.current) {
            page.current?.classList.remove(previousTheme.current);
        }

       page.current!.classList.add(themeValue);
       previousTheme.current = themeValue;
       
    }, [themeValue])

    return(
        <div ref={page} className='page' id='dashboard-page'>
            <div className='header'>
                <SearchBar />
                <ActivityPageLink />
                <ToggleThemeButton />
            </div>
            <div className='body'>

            </div>
        </div>
    )
}