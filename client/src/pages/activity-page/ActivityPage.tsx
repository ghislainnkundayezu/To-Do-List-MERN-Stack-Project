import { FC, useRef } from 'react';
import { ButtonComponent } from './components/ButtonComponents';
import { Activity } from './components/Activity';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUserData } from '../../utils/DataFetchingService';
import useThemeClass from '../../customHooks/useThemeClass';
import AuthenticationService from '../../utils/AuthenticationService';



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
    const page = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    
    
    const queryClient = useQueryClient();
    
    const cachedData =  queryClient.getQueryData<DataQuery>(['userData']);

    const { data, isLoading } = useQuery({
        queryKey: ["userData"],
        enabled: false,
        queryFn:  fetchUserData,
        retry: 0,
        refetchOnWindowFocus: true
    });

    const userData = cachedData || data; // Use cached data if it exists, otherwise use fetched data
    
    useThemeClass(page);
    

    if (isLoading) {
        return <div>Loading....</div>
    }

    if (!userData && !isLoading) {
        queryClient.fetchQuery({queryKey: ['userData'], queryFn:  fetchUserData});
        return <div>Loading....</div>
    }
    

    const logout = async () => {
        AuthenticationService.logout();
        queryClient.invalidateQueries({queryKey: ['userData']});
        //navigate("/authentication");
    }

    return(
        <>
        <Helmet>
            <title>Task | Activity</title>
        </Helmet>
        <div ref={page} id='activity-page' className="page">
            
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