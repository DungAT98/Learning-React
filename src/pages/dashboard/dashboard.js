import {Link} from "react-router-dom";
import React from 'react'

const Dashboard = () => {
    // const navigate = useNavigate();

    return (
        <div className="container-fluid">
            <h1>This is dashboard</h1>
            <Link className="btn btn-info" to='login'>Login</Link>
        </div>
    )
};

export default Dashboard;
