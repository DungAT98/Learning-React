import './App.css';
import AppRoutes from "./app-routes";
import {BrowserRouter} from "react-router-dom";
import React from 'react'

function App() {
    return (
        <BrowserRouter>
            <AppRoutes></AppRoutes>
        </BrowserRouter>
    );
}

export default App;
