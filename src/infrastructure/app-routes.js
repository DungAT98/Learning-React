import {useRoutes} from "react-router-dom";
import Login from "../pages/login/login";
import Dashboard from "../pages/dashboard/dashboard";

const AppRoutes = () => {
    return useRoutes([
        {path: '/', element: <Dashboard/>},
        {path: '/login', element: <Login></Login>}
    ]);
};

export default AppRoutes;
