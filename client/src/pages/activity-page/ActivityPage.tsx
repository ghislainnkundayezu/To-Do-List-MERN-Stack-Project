import { FC, useContext, useEffect, useMemo, useRef } from 'react';
import { ThemeContext } from '../../App';
import { ButtonComponent } from './components/ButtonComponents';
import { Activity } from './components/Activity';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';


/**
 * Display the Activity Page of User.
 * @returns {JSX.Element} - The returned component.
 */

interface DataQuery {
    data: {
        statistics: {
            ongoing: number;
            completed: number;
            deleted: number;
            total: number;
        }
    }
}

export const ActivityPage: FC = (): JSX.Element => {
    const { themeValue } = useContext(ThemeContext)!;
    const page = useRef<HTMLDivElement>(null);
    const previousTheme = useRef<string | null>(null);
    const navigate = useNavigate();
    
    
    
    
    const queryClient = useQueryClient();
    
    

    const { data: userData, isLoading } = useQuery({
        queryKey: ["userData"],
        enabled: true,
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:5000/api/v1/protected/user`,
                {
                  withCredentials: true,
                }
              );
              return response.data;
        }
    });

    if (isLoading) {
        return <div>Loading....</div>
    }
    console.log(userData)
    
    //TODO: remeber to work on this code.

    // useEffect(() => {

    //     if (previousTheme.current) {
    //         page.current?.classList.remove(previousTheme.current);
    //     }

    //    page.current!.classList.add(themeValue);
    //    previousTheme.current = themeValue;
       
    // }, [themeValue]);


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
                <Activity activityLabel='Ongoing Tasks' value={userData.data.statistics.ongoing}/>
                <Activity activityLabel='Finished Tasks' value={userData.data.statistics.completed}/>
                <Activity activityLabel='Deleted Tasks' value={userData.data.statistics.deleted}/>
                <Activity activityLabel='Total Tasks' value={userData.data.statistics.total}/>
            </div>

            <ButtonComponent logout={logout}/>

        </div>
        </>
    )
}