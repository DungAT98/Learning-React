import "./App.css";
import AppRoutes from "./app-routes";
import { RouterProvider } from "react-router-dom";
import React from "react";
import { ClipLoader } from "react-spinners";
import JwtInterceptor from "../interceptors/axios-interceptor";

JwtInterceptor();

function App() {
  const appRouting = AppRoutes();
  return (
    <React.Suspense fallback={<ClipLoader />}>
      <RouterProvider router={appRouting} />
    </React.Suspense>
  );
}

export default App;
