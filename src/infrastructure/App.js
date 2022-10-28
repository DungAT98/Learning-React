import './App.css';
import AppRoutes from "./app-routes";
import {BrowserRouter} from "react-router-dom";
import React from 'react'
import {ClipLoader} from "react-spinners";
import JwtInterceptor from "../interceptors/axios-interceptor";

JwtInterceptor();

function App() {
    return (
        <BrowserRouter>
            <React.Suspense fallback={<ClipLoader />}>
                <AppRoutes></AppRoutes>
            </React.Suspense>
        </BrowserRouter>
    );
}

export default App;
