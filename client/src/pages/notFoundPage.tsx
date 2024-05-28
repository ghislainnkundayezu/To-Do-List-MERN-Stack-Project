import { FC } from "react";
import { Link } from "react-router-dom";

/**
 * This components contains the data for the not found page.
 * 
 * @returns {JSX.Element}
 */
const NotFoundPage: FC = (): JSX.Element => { 
    return(
        <div className='page-not-found'> 
            <h1>Page not Found!</h1>
            <Link className="to-dashboard-btn" to={"/dashboard"}>Go To Dashboard</Link>
        </div> 
    );
}

export default NotFoundPage;