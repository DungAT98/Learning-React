import "./App.css";
import AppRoutes from "./app-routes";
import { RouterProvider } from "react-router-dom";
import React from "react";
import { ClipLoader } from "react-spinners";
import JwtInterceptor from "../interceptors/axios-interceptor";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

JwtInterceptor();
TimeAgo.addDefaultLocale(en);

function App() {
  const appRouting = AppRoutes();
  return (
    <React.Suspense fallback={<ClipLoader />}>
      <RouterProvider router={appRouting} />
    </React.Suspense>
  );
}

export default App;
