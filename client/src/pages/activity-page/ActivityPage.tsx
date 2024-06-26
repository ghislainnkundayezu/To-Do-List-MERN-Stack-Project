import { FC, useRef } from 'react';
import { ButtonComponent } from './components/ButtonComponents';
import { Activity } from './components/Activity';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUserData } from '../../utils/DataFetchingService';
import useThemeClass from '../../customHooks/useThemeClass';
import AuthenticationService from '../../utils/AuthenticationService';
import { PuffLoader } from 'react-spinners';



/**
 * Displays the Activity Page of User.
 * @returns {JSX.Element} - The returned component.
 */

export const ActivityPage: FC = (): JSX.Element => {
    const page = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    
    const queryClient = useQueryClient();

    const { data: userData, isLoading } = useQuery({
        queryKey: ["userData"],
        queryFn:  fetchUserData,
        retry: 0,
       
    });

    useThemeClass(page);

    if (isLoading) {
        return(
            <div id="loading-animation-container">
                <PuffLoader color="#36d7b7" loading={isLoading} size={100} />
            </div>
        );
    }

     

    const logout = async () => {
        AuthenticationService.logout();
        queryClient.clear();
        navigate("/authentication", { replace: true });
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
                <Activity activityLabel='Ongoing' value={userData.data.statistics.ongoing}/>
                <Activity activityLabel='Finished' value={userData.data.statistics.completed}/>
                <Activity activityLabel='Deleted' value={userData.data.statistics.deleted}/>
                <Activity activityLabel='Total' value={userData.data.statistics.total}/>
            </div>

            <ButtonComponent logout={logout}/>

        </div>
        </>
    )
}