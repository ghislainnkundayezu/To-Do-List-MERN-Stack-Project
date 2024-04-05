import { FC, useContext, useEffect, useRef } from 'react';
import { ThemeContext } from '../../App';
import { ButtonComponent } from './components/ButtonComponents';
import { Activity } from './components/Activity';



export const ActivityPage: FC = () => {
    const { themeValue } = useContext(ThemeContext)!;
    const page = useRef<HTMLDivElement>(null);
    const previousTheme = useRef<string | null>(null);

    useEffect(() => {
        if (previousTheme.current) {
            page.current?.classList.remove(previousTheme.current);
        }

       page.current!.classList.add(themeValue);
       previousTheme.current = themeValue;
       
    }, [themeValue]);



    return(
        <div ref={page} id='activity-page' className='page'>
            
            <div id='personal-details'>
                <h1>Personal Details</h1>
                <p>Nkundayezu Ghislain</p>
            </div>
            
            <div id='activities-list'>
                <Activity activityLabel='Ongoing Tasks'/>
                <Activity activityLabel='Finished Tasks'/>
                <Activity activityLabel='Deleted Tasks'/>
                <Activity activityLabel='Total Tasks'/>
            </div>

            <ButtonComponent logout={()=> {}}/>

        </div>
    )
}