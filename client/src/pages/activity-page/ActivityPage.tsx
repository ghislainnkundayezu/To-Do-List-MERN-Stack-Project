import { FC, useContext, useEffect, useRef } from 'react';
import { ThemeContext } from '../../App';
import { ButtonComponent } from './components/ButtonComponents';
import { Activity } from './components/Activity';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


/**
 * Display the Activity Page of User.
 * @returns {JSX.Element} - The returned component.
 */

export const ActivityPage: FC = (): JSX.Element => {
    const { themeValue } = useContext(ThemeContext)!;
    const page = useRef<HTMLDivElement>(null);
    const previousTheme = useRef<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (previousTheme.current) {
            page.current?.classList.remove(previousTheme.current);
        }

       page.current!.classList.add(themeValue);
       previousTheme.current = themeValue;
       
    }, [themeValue]);


    const logout = () => {
        navigate("/authentication");
    }

    return(
        <>
        <Helmet>
            <title>Task | Activity</title>
        </Helmet>
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

            <ButtonComponent logout={logout}/>

        </div>
        </>
    )
}