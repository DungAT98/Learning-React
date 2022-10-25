import './App.css';
import AppRoutes from "./app-routes";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <AppRoutes></AppRoutes>
        </BrowserRouter>
    );
}

export default App;
