import { useRoutes } from "react-router-dom";
import React from "react";
import AuthRequiredRoute from "../shared/auth-require-route";
import AuthenticatedLayout from "../pages/layout/layout";
import SearchCategory from "../pages/category/search-category";

const LoginComponent = React.lazy(() => import("../pages/login/login"));

const DashboardComponent = React.lazy(() =>
  import("../pages/dashboard/dashboard")
);

const AppRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: (
        <AuthRequiredRoute
          element={
            <AuthenticatedLayout>
              <DashboardComponent />
            </AuthenticatedLayout>
          }
        />
      ),
    },
    {
      path: "category",
      element: (
        <AuthRequiredRoute
          element={
            <AuthenticatedLayout>
              <SearchCategory />
            </AuthenticatedLayout>
          }
        />
      ),
    },
    { path: "/login", element: <LoginComponent /> },
  ]);
};

export default AppRoutes;
